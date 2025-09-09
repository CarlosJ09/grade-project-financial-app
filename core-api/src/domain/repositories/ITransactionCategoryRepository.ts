import { TransactionCategory } from '@/domain/entities/TransactionCategory';
import { IBaseRepository } from './IBaseRepository';

export interface ITransactionCategoryRepository
  extends IBaseRepository<TransactionCategory> {
  findByName(name: string): Promise<TransactionCategory | null>;
}
