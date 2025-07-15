export interface UserBalance {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  baseCurrency: string;
  balancesByCurrency: CurrencyBalance[];
  lastTransactionDate?: Date;
}

export interface CurrencyBalance {
  currency: string;
  balance: number;
  income: number;
  expenses: number;
}
