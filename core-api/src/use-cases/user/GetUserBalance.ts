import { ICurrencyRepository } from '@/domain/repositories/ICurrencyRepository';
import { IExchangeRateRepository } from '@/domain/repositories/IExchangeRateRepository';
import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';

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
    private exchangeRateRepository: IExchangeRateRepository
  ) {}

  async execute(request: GetUserBalanceRequest): Promise<UserBalanceData> {
    const { userId, baseCurrencyId, fromDate, toDate } = request;

    // Get all non-deleted transactions for the user
    const transactions = await this.transactionRepository.findByUserId(userId, {
      fromDate,
      toDate,
      excludeDeleted: true,
    });

    if (transactions.length === 0) {
      return {
        totalBalance: 0,
        totalIncome: 0,
        totalExpenses: 0,
        baseCurrency: baseCurrencyId
          ? await this.getCurrencyCode(baseCurrencyId)
          : 'USD',
        balancesByCurrency: [],
        lastTransactionDate: null,
      };
    }

    // Group transactions by currency
    const transactionsByCurrency =
      this.groupTransactionsByCurrency(transactions);

    // Calculate balances for each currency
    const balancesByCurrency = await Promise.all(
      Object.entries(transactionsByCurrency).map(async ([currencyId, txns]) => {
        const currency = await this.getCurrencyCode(parseInt(currencyId));
        const { income, expenses } = this.calculateIncomeAndExpenses(txns);

        return {
          currency,
          balance: income - expenses,
          income,
          expenses,
        };
      })
    );

    // Convert everything to base currency if specified
    let totalBalance = 0;
    let totalIncome = 0;
    let totalExpenses = 0;

    if (baseCurrencyId) {
      const baseCurrency = await this.getCurrencyCode(baseCurrencyId);

      for (const currencyBalance of balancesByCurrency) {
        const rate = await this.getExchangeRate(
          currencyBalance.currency,
          baseCurrency
        );
        totalBalance += currencyBalance.balance * rate;
        totalIncome += currencyBalance.income * rate;
        totalExpenses += currencyBalance.expenses * rate;
      }
    } else {
      // If no base currency, sum in original currencies (only works if single currency)
      if (balancesByCurrency.length === 1) {
        totalBalance = balancesByCurrency[0].balance;
        totalIncome = balancesByCurrency[0].income;
        totalExpenses = balancesByCurrency[0].expenses;
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
      balancesByCurrency,
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
    return exchangeRate?.rate || 1;
  }
}
