import { BudgetCategory } from '@/domain/entities/BudgetCategory';
import { BudgetType } from '@/domain/entities/BudgetType';

export class BudgetCategoryResponseDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly budgetTypeId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly budgetType?: BudgetType
  ) {}

  static fromEntity(budgetCategory: BudgetCategory): BudgetCategoryResponseDto {
    return new BudgetCategoryResponseDto(
      budgetCategory.id,
      budgetCategory.name,
      budgetCategory.budgetTypeId,
      budgetCategory.createdAt,
      budgetCategory.updatedAt,
      budgetCategory.budgetType
    );
  }
}
