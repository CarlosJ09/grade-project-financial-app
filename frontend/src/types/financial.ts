export interface Bank {
  id: string;
  name: string;
  code: string;
  logo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Currency {
  id: string;
  code: string;
  name: string;
  symbol: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currencyId: string;
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
  currencyId: string;
  type: 'income' | 'expense';
  categoryId: string;
  paymentMethodId: string;
  place: string;
  transactionDate: string;
  exchangeRateId?: string;
  bankingProductId?: string;
}

export interface Budget {
  id: string;
  name: string;
  totalAmount: number;
  spentAmount: number;
  startDate: string;
  endDate: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
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
  name: string;
  type: 'cash' | 'card' | 'bank_transfer' | 'digital_wallet';
  userId: string;
  createdAt: string;
  updatedAt: string;
}
