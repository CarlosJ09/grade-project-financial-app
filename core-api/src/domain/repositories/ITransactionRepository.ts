import { Transaction } from '@/domain/entities/Transaction';
import { IBaseRepository } from './IBaseRepository';

interface TransactionFilters {
  fromDate?: Date;
  toDate?: Date;
  excludeDeleted?: boolean;
}

export interface ITransactionRepository extends IBaseRepository<Transaction> {
  findByUserId(
    userId: string,
    filters?: TransactionFilters
  ): Promise<Transaction[]>;
}
