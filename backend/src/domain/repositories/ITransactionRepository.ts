import { Transaction } from '@/domain/entities/Transaction';
import { IBaseRepository } from './IBaseRepository';

export interface ITransactionRepository extends IBaseRepository<Transaction> {}
