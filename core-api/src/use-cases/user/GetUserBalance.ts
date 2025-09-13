import { ICurrencyRepository } from '@/domain/repositories/ICurrencyRepository';
import { IExchangeRateRepository } from '@/domain/repositories/IExchangeRateRepository';
import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';
import { IUserBankingProductRepository } from '@/domain/repositories/IUserBankingProductRepository';

interface UserBalanceData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  baseCurrency: string;
  balancesByCurrency: Array<{
    currency: string;
    balance: number;
    income: number;
    expenses: number;
  }>;
  accountBalances: Array<{
    accountId: string;
    accountLabel: string;
    accountType: string;
    currency: string;
    balance: number;
    lastUpdate: Date | null;
  }>;
  cashHoldings: Array<{
    currency: string;
    amount: number;
    label: string;
  }>;
  assets: Array<{
    id: string;
    type: string;
    name: string;
    value: number;
    currency: string;
    description: string | null;
  }>;
  lastTransactionDate: Date | null;
}

interface GetUserBalanceRequest {
  userId: string;
  baseCurrencyId?: number; // Optional: convert all to base currency
  fromDate?: Date;
  toDate?: Date;
}

export class GetUserBalance {
  constructor(
    private transactionRepository: ITransactionRepository,
    private currencyRepository: ICurrencyRepository,
    private exchangeRateRepository: IExchangeRateRepository,
    private userBankingProductRepository: IUserBankingProductRepository
  ) {}

  async execute(request: GetUserBalanceRequest): Promise<UserBalanceData> {
    const { userId, baseCurrencyId, fromDate, toDate } = request;

    // Get all user's banking products (accounts) with current balances
    const userAccounts =
      await this.userBankingProductRepository.findByUserId(userId);

    // Get all transactions for income/expense calculation (still needed for analytics)
    const transactions = await this.transactionRepository.findByUserId(userId, {
      fromDate,
      toDate,
      excludeDeleted: true,
    });

    // TODO: Get cash holdings and assets when repositories are implemented
    // const cashHoldings = await this.userCashHoldingRepository.findByUserId(userId);
    // const userAssets = await this.userAssetRepository.findByUserId(userId);

    // For now, use empty arrays
    const cashHoldings: any[] = [];
    const userAssets: any[] = [];

    // Process account balances
    const accountBalances = await Promise.all(
      userAccounts.map(async account => {
        const currency = await this.getCurrencyCode(account.currencyId);
        const accountType =
          account.bankBankingProduct?.bankingProduct?.name || 'Unknown';

        return {
          accountId: account.id,
          accountLabel: account.label,
          accountType,
          currency,
          balance: parseFloat(account.currentBalance.toString()),
          lastUpdate: account.lastBalanceUpdate,
        };
      })
    );

    // Process cash holdings
    const cashHoldingsSummary = await Promise.all(
      cashHoldings.map(async (cash: any) => {
        const currency = await this.getCurrencyCode(cash.currencyId);
        return {
          currency,
          amount: parseFloat(cash.amount.toString()),
          label: cash.label,
        };
      })
    );

    // Process assets
    const assetsSummary = await Promise.all(
      userAssets.map(async (asset: any) => {
        const currency = await this.getCurrencyCode(asset.currencyId);
        return {
          id: asset.id,
          type: asset.assetType,
          name: asset.assetName,
          value: parseFloat(asset.currentValue.toString()),
          currency,
          description: asset.description,
        };
      })
    );

    // Group all balances by currency
    const balancesByCurrency: Record<
      string,
      { balance: number; income: number; expenses: number }
    > = {};

    // Add account balances
    for (const account of accountBalances) {
      if (!balancesByCurrency[account.currency]) {
        balancesByCurrency[account.currency] = {
          balance: 0,
          income: 0,
          expenses: 0,
        };
      }
      balancesByCurrency[account.currency].balance += account.balance;
    }

    // Add cash holdings
    for (const cash of cashHoldingsSummary) {
      if (!balancesByCurrency[cash.currency]) {
        balancesByCurrency[cash.currency] = {
          balance: 0,
          income: 0,
          expenses: 0,
        };
      }
      balancesByCurrency[cash.currency].balance += cash.amount;
    }

    // Add assets
    for (const asset of assetsSummary) {
      if (!balancesByCurrency[asset.currency]) {
        balancesByCurrency[asset.currency] = {
          balance: 0,
          income: 0,
          expenses: 0,
        };
      }
      balancesByCurrency[asset.currency].balance += asset.value;
    }

    // Calculate income and expenses from transactions (for analytics)
    const transactionsByCurrency =
      this.groupTransactionsByCurrency(transactions);
    for (const [currencyId, txns] of Object.entries(transactionsByCurrency)) {
      const currency = await this.getCurrencyCode(parseInt(currencyId));
      const { income, expenses } = this.calculateIncomeAndExpenses(txns);

      if (!balancesByCurrency[currency]) {
        balancesByCurrency[currency] = { balance: 0, income: 0, expenses: 0 };
      }
      balancesByCurrency[currency].income = income;
      balancesByCurrency[currency].expenses = expenses;
    }

    // Convert to array format
    const balancesByCurrencyArray = Object.entries(balancesByCurrency).map(
      ([currency, data]) => ({
        currency,
        balance: data.balance,
        income: data.income,
        expenses: data.expenses,
      })
    );

    // Calculate totals (convert to base currency if specified)
    let totalBalance = 0;
    let totalIncome = 0;
    let totalExpenses = 0;

    if (baseCurrencyId) {
      const baseCurrency = await this.getCurrencyCode(baseCurrencyId);

      for (const currencyData of balancesByCurrencyArray) {
        const rate = await this.getExchangeRate(
          currencyData.currency,
          baseCurrency
        );
        totalBalance += currencyData.balance * rate;
        totalIncome += currencyData.income * rate;
        totalExpenses += currencyData.expenses * rate;
      }
    } else {
      // If no base currency, sum in original currencies (only works if single currency)
      if (balancesByCurrencyArray.length === 1) {
        totalBalance = balancesByCurrencyArray[0].balance;
        totalIncome = balancesByCurrencyArray[0].income;
        totalExpenses = balancesByCurrencyArray[0].expenses;
      } else {
        // Multiple currencies without base currency - sum all (not recommended)
        totalBalance = balancesByCurrencyArray.reduce(
          (sum, curr) => sum + curr.balance,
          0
        );
        totalIncome = balancesByCurrencyArray.reduce(
          (sum, curr) => sum + curr.income,
          0
        );
        totalExpenses = balancesByCurrencyArray.reduce(
          (sum, curr) => sum + curr.expenses,
          0
        );
      }
    }

    // Find last transaction date
    const lastTransactionDate = transactions.reduce(
      (latest, tx) => {
        return !latest || tx.transactionDate > latest
          ? tx.transactionDate
          : latest;
      },
      null as Date | null
    );

    return {
      totalBalance,
      totalIncome,
      totalExpenses,
      baseCurrency: baseCurrencyId
        ? await this.getCurrencyCode(baseCurrencyId)
        : 'USD',
      balancesByCurrency: balancesByCurrencyArray,
      accountBalances,
      cashHoldings: cashHoldingsSummary,
      assets: assetsSummary,
      lastTransactionDate,
    };
  }

  private groupTransactionsByCurrency(
    transactions: any[]
  ): Record<string, any[]> {
    return transactions.reduce(
      (groups, transaction) => {
        const currencyId = transaction.currencyId;
        if (!groups[currencyId]) {
          groups[currencyId] = [];
        }
        groups[currencyId].push(transaction);
        return groups;
      },
      {} as Record<string, any[]>
    );
  }

  private calculateIncomeAndExpenses(transactions: any[]): {
    income: number;
    expenses: number;
  } {
    return transactions.reduce(
      (totals, transaction) => {
        if (transaction.type === 'income') {
          totals.income += transaction.amount;
        } else if (transaction.type === 'expense') {
          totals.expenses += transaction.amount;
        }
        return totals;
      },
      { income: 0, expenses: 0 }
    );
  }

  private async getCurrencyCode(currencyId: number): Promise<string> {
    const currency = await (this.currencyRepository as any).findByIdInt(
      currencyId
    );
    return currency?.currency || 'USD';
  }

  private async getExchangeRate(
    fromCurrency: string,
    toCurrency: string
  ): Promise<number> {
    if (fromCurrency === toCurrency) return 1;

    // Get the most recent exchange rate
    const exchangeRate = await this.exchangeRateRepository.findLatestRate(
      fromCurrency,
      toCurrency
    );
    return parseFloat(exchangeRate?.rate.toString() || '1');
  }
}
