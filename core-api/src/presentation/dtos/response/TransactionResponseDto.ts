import { Currency } from '@/domain/entities/Currency';
import { ExchangeRate } from '@/domain/entities/ExchangeRate';
import { Merchant } from '@/domain/entities/Merchant';
import { PaymentMethod } from '@/domain/entities/PaymentMethod';
import { Transaction } from '@/domain/entities/Transaction';
import { TransactionCategory } from '@/domain/entities/TransactionCategory';
import { TransactionType } from '@/domain/entities/TransactionType';
import { UserBankingProduct } from '@/domain/entities/UserBankingProduct';
import { Decimal } from '@prisma/client/runtime/library';

export class TransactionResponseDto {
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

  static fromEntity(transaction: Transaction): TransactionResponseDto {
    return new TransactionResponseDto(
      transaction.id,
      transaction.userId,
      transaction.amount,
      transaction.currencyId,
      transaction.exchangeRateId,
      transaction.transactionTypeId,
      transaction.categoryId,
      transaction.merchantId,
      transaction.userBankingProductId,
      transaction.paymentMethodId,
      transaction.transactionDate,
      transaction.createdAt,
      transaction.updatedAt,
      transaction.deletedAt,
      transaction.currency,
      transaction.exchangeRate,
      transaction.category,
      transaction.transactionType,
      transaction.paymentMethod,
      transaction.merchant,
      transaction.userBankingProduct
    );
  }
}
