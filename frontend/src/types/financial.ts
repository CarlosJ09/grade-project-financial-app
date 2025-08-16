export interface Bank {
  id: string;
  name: string;
  code: string;
  logo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Currency {
  id: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currencyId: number;
  exchangeRateId: string | null;
  type: 'income' | 'expense';
  categoryId: string;
  paymentMethodId: string;
  place: string;
  bankingProductId: string | null;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionInput {
  amount: number;
  currencyId: number;
  type: 'income' | 'expense';
  categoryId: string;
  paymentMethodId: string;
  place: string;
  transactionDate: string;
  exchangeRateId?: string;
  bankingProductId?: string;
  userId: string;
}

export type BudgetState = 'active' | 'inactive' | 'completed';

export interface Budget {
  id: string;
  userId: string;
  name: string;
  description: string;
  currentAmount: number;
  goalAmount: number;
  currencyId: string;
  startDate: string;
  finishedDate: string;
  state: BudgetState;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  type: 'income' | 'expense';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentMethod {
  id: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}
