interface CurrencyBalanceData {
  currency: string;
  balance: number;
  income: number;
  expenses: number;
}

interface AccountBalanceData {
  accountId: string;
  accountLabel: string;
  accountType: string;
  currency: string;
  balance: number;
  lastUpdate: Date | null;
}

interface CashHoldingData {
  currency: string;
  amount: number;
  label: string;
}

interface AssetData {
  id: string;
  type: string;
  name: string;
  value: number;
  currency: string;
  description: string | null;
}

export class UserBalanceResponseDto {
  constructor(
    public readonly totalBalance: number,
    public readonly totalIncome: number,
    public readonly totalExpenses: number,
    public readonly baseCurrency: string,
    public readonly balancesByCurrency: CurrencyBalanceData[],
    public readonly accountBalances: AccountBalanceData[],
    public readonly cashHoldings: CashHoldingData[],
    public readonly assets: AssetData[],
    public readonly lastTransactionDate: Date | null
  ) {}

  static fromData(data: {
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
  }): UserBalanceResponseDto {
    return new UserBalanceResponseDto(
      data.totalBalance,
      data.totalIncome,
      data.totalExpenses,
      data.baseCurrency,
      data.balancesByCurrency,
      data.accountBalances,
      data.cashHoldings,
      data.assets,
      data.lastTransactionDate
    );
  }
}
