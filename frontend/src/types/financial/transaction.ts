import { BankingProduct } from '@/types/financial/bank';
import {
  Category,
  Currency,
  ExchangeRate,
  PaymentMethod,
} from '@/types/financial/shared';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currencyId: number;
  exchangeRateId: string | null;
  type: 'income' | 'expense';
  categoryId: number;
  paymentMethodId: number;
  place: string;
  bankingProductId: number | null;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  currency?: Currency;
  exchangeRate?: ExchangeRate;
  category?: Category;
  paymentMethod?: PaymentMethod;
  bankingProduct?: BankingProduct;
}

export interface CreateTransactionInput {
  amount: number;
  currencyId: number;
  type: 'income' | 'expense';
  categoryId: number;
  paymentMethodId: number;
  place: string;
  transactionDate: Date;
  exchangeRateId?: string;
  bankingProductId?: number;
  userId: string;
}
