import { BudgetType } from '@/domain/entities/BudgetType';
import { IBaseRepository } from './IBaseRepository';

export interface IBudgetTypeRepository extends IBaseRepository<BudgetType> {
  findByName(name: string): Promise<BudgetType | null>;
}
