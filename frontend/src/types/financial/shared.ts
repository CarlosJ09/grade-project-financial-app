export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMethod {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExchangeRate {
  id: number;
  currencyId: number;
  rate: number;
  rateDate: Date;
}
