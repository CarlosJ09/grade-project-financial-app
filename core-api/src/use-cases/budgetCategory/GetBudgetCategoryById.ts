import { BudgetCategory } from '@/domain/entities/BudgetCategory';
import { IBudgetCategoryRepository } from '@/domain/repositories/IBudgetCategoryRepository';

export class GetBudgetCategoryById {
  constructor(private budgetCategoryRepository: IBudgetCategoryRepository) {}

  async execute(id: number): Promise<BudgetCategory | null> {
    return this.budgetCategoryRepository.findById(id);
  }
}
