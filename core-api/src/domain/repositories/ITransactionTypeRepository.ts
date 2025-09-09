import { TransactionType } from '@/domain/entities/TransactionType';
import { IBaseRepository } from './IBaseRepository';

export interface ITransactionTypeRepository
  extends IBaseRepository<TransactionType> {
  findByName(name: string): Promise<TransactionType | null>;
}
