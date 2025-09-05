import { BankingProduct } from '@/domain/entities/BankingProduct';
import { Category } from '@/domain/entities/Category';
import { Currency } from '@/domain/entities/Currency';
import { ExchangeRate } from '@/domain/entities/ExchangeRate';
import { PaymentMethod } from '@/domain/entities/PaymentMethod';
import { Transaction } from '@/domain/entities/Transaction';
import { Decimal } from '@prisma/client/runtime/library';

export class TransactionResponseDto {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly amount: Decimal,
    public readonly currencyId: number,
    public readonly exchangeRateId: number | null,
    public readonly type: string,
    public readonly categoryId: number,
    public readonly paymentMethodId: number,
    public readonly place: string,
    public readonly bankingProductId: number | null,
    public readonly transactionDate: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly currency?: Currency,
    public readonly exchangeRate?: ExchangeRate,
    public readonly category?: Category,
    public readonly paymentMethod?: PaymentMethod,
    public readonly bankingProduct?: BankingProduct
  ) {}

  static fromEntity(transaction: Transaction): TransactionResponseDto {
    return new TransactionResponseDto(
      transaction.id,
      transaction.userId,
      transaction.amount,
      transaction.currencyId,
      transaction.exchangeRateId,
      transaction.type,
      transaction.categoryId,
      transaction.paymentMethodId,
      transaction.place,
      transaction.bankingProductId,
      transaction.transactionDate,
      transaction.createdAt,
      transaction.updatedAt,
      transaction.currency,
      transaction.exchangeRate,
      transaction.category,
      transaction.paymentMethod,
      transaction.bankingProduct
    );
  }
}
