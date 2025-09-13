import { Currency } from '@/types/financial/shared';

export interface Bank {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BankingProduct {
  id: number;
  bankingProductName: string;
}

export interface BankBankingProduct {
  id: number;
  bankId: number;
  bankingProductId: number;
  bank?: Bank;
  bankingProduct?: BankingProduct;
}

export interface UserBankingProduct {
  id: string;
  userId: string;
  bankBankingProductId: number;
  referenceNumber: string;
  label: string;
  currencyId: number;
  currentBalance: number;
  lastBalanceUpdate: Date | null;
  createdAt: Date;
  updatedAt: Date;
  bankBankingProduct?: BankBankingProduct;
  currency?: Currency;
}
