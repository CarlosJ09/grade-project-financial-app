import { BudgetStatus } from '@/domain/entities/BudgetStatus';
import { IBaseRepository } from './IBaseRepository';

export interface IBudgetStatusRepository extends IBaseRepository<BudgetStatus> {
  findByName(name: string): Promise<BudgetStatus | null>;
}
