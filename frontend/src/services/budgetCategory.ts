import { BaseService } from '@/services/base';
import { BudgetCategory } from '@/types/financial/budget';

class BudgetCategoryService extends BaseService<BudgetCategory> {
  constructor() {
    super('/budget-categories');
  }
}

export const budgetCategoryService = new BudgetCategoryService();
