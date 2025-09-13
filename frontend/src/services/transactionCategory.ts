import { BaseService } from '@/services/base';
import { TransactionCategory } from '@/types/financial/transaction';

class TransactionCategoryService extends BaseService<TransactionCategory> {
  constructor() {
    super('/transaction-categories');
  }
}

export const transactionCategoryService = new TransactionCategoryService();
