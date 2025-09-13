import { Currency } from '@/stores';

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

export interface UserAsset {
  id: string;
  userId: string;
  assetType: string;
  assetName: string;
  currentValue: number;
  currencyId: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  currency?: Currency;
}
