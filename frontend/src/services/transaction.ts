import { BaseService } from '@/services/base';
import { Transaction } from '@/types/financial';

class TransactionService extends BaseService<Transaction> {
  constructor() {
    super('/transactions');
  }
}

export const transactionService = new TransactionService();
