import { BaseService } from '@/services/base';
import { BudgetStatus } from '@/types/financial/budget';

class BudgetStatusService extends BaseService<BudgetStatus> {
  constructor() {
    super('/budget-statuses');
  }
}

export const budgetStatusService = new BudgetStatusService();
