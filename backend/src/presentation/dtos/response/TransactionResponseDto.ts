import { Transaction } from '@/domain/entities/Transaction';

export class TransactionResponseDto {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly amount: number,
    public readonly currencyId: number,
    public readonly exchangeRateId: number | null,
    public readonly type: string,
    public readonly categoryId: number,
    public readonly paymentMethodId: number,
    public readonly place: string,
    public readonly bankingProductId: number | null,
    public readonly transactionDate: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
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
      transaction.updatedAt
    );
  }
}
