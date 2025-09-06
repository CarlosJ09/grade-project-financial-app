export interface Currency {
  id: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  type: 'income' | 'expense' | 'budget';
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

export interface ExchangeRate {
  id: number;
  currencyId: number;
  rate: number;
  rateDate: Date;
}
