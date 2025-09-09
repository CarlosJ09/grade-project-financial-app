import { BudgetStatus } from '@/domain/entities/BudgetStatus';

export class BudgetStatusResponseDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static fromEntity(budgetStatus: BudgetStatus): BudgetStatusResponseDto {
    return new BudgetStatusResponseDto(
      budgetStatus.id,
      budgetStatus.name,
      budgetStatus.description,
      budgetStatus.createdAt,
      budgetStatus.updatedAt
    );
  }
}
