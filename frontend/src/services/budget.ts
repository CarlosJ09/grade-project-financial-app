import { BaseService } from '@/services/base';
import { Budget } from '@/types/financial';

class BudgetService extends BaseService<Budget> {
  constructor() {
    super('/budgets');
  }
}

export const categoryService = new BudgetService();
