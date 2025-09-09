import { BudgetCategory } from '@/domain/entities/BudgetCategory';
import { IBaseRepository } from './IBaseRepository';

export interface IBudgetCategoryRepository
  extends IBaseRepository<BudgetCategory> {
  findByBudgetTypeId(budgetTypeId: number): Promise<BudgetCategory[]>;
}
