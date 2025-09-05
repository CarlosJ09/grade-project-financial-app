interface CurrencyBalanceData {
  currency: string;
  balance: number;
  income: number;
  expenses: number;
}

export class UserBalanceResponseDto {
  constructor(
    public readonly totalBalance: number,
    public readonly totalIncome: number,
    public readonly totalExpenses: number,
    public readonly baseCurrency: string,
    public readonly balancesByCurrency: CurrencyBalanceData[],
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
    lastTransactionDate: Date | null;
  }): UserBalanceResponseDto {
    return new UserBalanceResponseDto(
      data.totalBalance,
      data.totalIncome,
      data.totalExpenses,
      data.baseCurrency,
      data.balancesByCurrency,
      data.lastTransactionDate
    );
  }
}
