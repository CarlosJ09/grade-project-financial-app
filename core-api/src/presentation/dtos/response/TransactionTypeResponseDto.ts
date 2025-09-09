import { TransactionType } from '@/domain/entities/TransactionType';

export class TransactionTypeResponseDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static fromEntity(
    transactionType: TransactionType
  ): TransactionTypeResponseDto {
    return new TransactionTypeResponseDto(
      transactionType.id,
      transactionType.name,
      transactionType.createdAt,
      transactionType.updatedAt
    );
  }
}
