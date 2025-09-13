import { UserBankingProduct } from '@/types/financial/bank';
import {
  Currency,
  ExchangeRate,
  PaymentMethod,
} from '@/types/financial/shared';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currencyId: number;
  exchangeRateId: number | null;
  transactionTypeId: number;
  categoryId: number;
  merchantId: number;
  userBankingProductId: string | null;
  paymentMethodId: number;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  currency?: Currency;
  exchangeRate?: ExchangeRate;
  category?: TransactionCategory;
  transactionType?: TransactionType;
  paymentMethod?: PaymentMethod;
  merchant?: Merchant;
  userBankingProduct?: UserBankingProduct;
}

export interface TransactionType {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionCategory {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Merchant {
  id: number;
  name: string;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  website?: string;
  location?: string;
}

export interface MerchantCategory {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTransactionInput {
  userId: string;
  amount: number;
  currencyId: number;
  exchangeRateId?: number | null;
  transactionTypeId: number;
  categoryId: number;
  merchantId: number;
  userBankingProductId?: string | null;
  paymentMethodId: number;
  transactionDate: Date;
}
