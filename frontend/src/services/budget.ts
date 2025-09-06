import { BaseService } from '@/services/base';
import { Budget } from '@/types/financial/budget';

class BudgetService extends BaseService<Budget> {
  constructor() {
    super('/budgets');
  }
}

export const budgetService = new BudgetService();
