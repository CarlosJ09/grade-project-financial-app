import { BaseService } from '@/services/base';
import { TransactionType } from '@/types/financial/transaction';

class TransactionTypeService extends BaseService<TransactionType> {
  constructor() {
    super('/transaction-types');
  }
}

export const transactionTypeService = new TransactionTypeService();
