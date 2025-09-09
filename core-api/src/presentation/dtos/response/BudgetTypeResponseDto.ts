import { BudgetType } from '@/domain/entities/BudgetType';

export class BudgetTypeResponseDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static fromEntity(budgetType: BudgetType): BudgetTypeResponseDto {
    return new BudgetTypeResponseDto(
      budgetType.id,
      budgetType.name,
      budgetType.description,
      budgetType.createdAt,
      budgetType.updatedAt
    );
  }
}
