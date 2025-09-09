import { BudgetCategory } from '@/domain/entities/BudgetCategory';
import { IBudgetCategoryRepository } from '@/domain/repositories/IBudgetCategoryRepository';

export class GetAllBudgetCategories {
  constructor(private budgetCategoryRepository: IBudgetCategoryRepository) {}

  async execute(budgetTypeId?: number): Promise<BudgetCategory[]> {
    if (budgetTypeId) {
      return this.budgetCategoryRepository.findByBudgetTypeId(budgetTypeId);
    }
    return this.budgetCategoryRepository.findAll();
  }
}
