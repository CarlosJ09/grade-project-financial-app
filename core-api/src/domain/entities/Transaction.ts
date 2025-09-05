import { BankingProduct } from '@/domain/entities/BankingProduct';
import { Category } from '@/domain/entities/Category';
import { Currency } from '@/domain/entities/Currency';
import { ExchangeRate } from '@/domain/entities/ExchangeRate';
import { PaymentMethod } from '@/domain/entities/PaymentMethod';
import { Decimal } from '@prisma/client/runtime/library';

class Transaction {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly amount: Decimal,
    public readonly currencyId: number,
    public readonly exchangeRateId: number | null,
    public readonly type: string, // expense, income
    public readonly categoryId: number,
    public readonly paymentMethodId: number,
    public readonly place: string,
    public readonly bankingProductId: number | null,
    public readonly transactionDate: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt?: Date,
    public readonly currency?: Currency,
    public readonly exchangeRate?: ExchangeRate,
    public readonly category?: Category,
    public readonly paymentMethod?: PaymentMethod,
    public readonly bankingProduct?: BankingProduct
  ) {}
}

export { Transaction };
