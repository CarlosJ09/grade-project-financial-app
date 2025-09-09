import { Currency } from '@/domain/entities/Currency';
import { ExchangeRate } from '@/domain/entities/ExchangeRate';
import { Merchant } from '@/domain/entities/Merchant';
import { PaymentMethod } from '@/domain/entities/PaymentMethod';
import { TransactionCategory } from '@/domain/entities/TransactionCategory';
import { TransactionType } from '@/domain/entities/TransactionType';
import { UserBankingProduct } from '@/domain/entities/UserBankingProduct';
import { Decimal } from '@prisma/client/runtime/library';

class Transaction {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly amount: Decimal,
    public readonly currencyId: number,
    public readonly exchangeRateId: number | null,
    public readonly transactionTypeId: number,
    public readonly categoryId: number,
    public readonly merchantId: number,
    public readonly userBankingProductId: string | null,
    public readonly paymentMethodId: number,
    public readonly transactionDate: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt?: Date,
    public readonly currency?: Currency,
    public readonly exchangeRate?: ExchangeRate,
    public readonly category?: TransactionCategory,
    public readonly transactionType?: TransactionType,
    public readonly paymentMethod?: PaymentMethod,
    public readonly merchant?: Merchant,
    public readonly userBankingProduct?: UserBankingProduct
  ) {}
}

export { Transaction };
