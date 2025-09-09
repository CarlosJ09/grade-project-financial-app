import { TransactionCategory } from '@/domain/entities/TransactionCategory';

export class TransactionCategoryResponseDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static fromEntity(
    transactionCategory: TransactionCategory
  ): TransactionCategoryResponseDto {
    return new TransactionCategoryResponseDto(
      transactionCategory.id,
      transactionCategory.name,
      transactionCategory.createdAt,
      transactionCategory.updatedAt
    );
  }
}
