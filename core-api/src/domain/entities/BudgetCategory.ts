import { BudgetType } from '@/domain/entities/BudgetType';

class BudgetCategory {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly budgetTypeId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly budgetType?: BudgetType
  ) {}
}

export { BudgetCategory };
