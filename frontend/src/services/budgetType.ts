import { BaseService } from '@/services/base';
import { BudgetType } from '@/types/financial/budget';

class BudgetTypeService extends BaseService<BudgetType> {
  constructor() {
    super('/budget-types');
  }
}

export const budgetTypeService = new BudgetTypeService();
