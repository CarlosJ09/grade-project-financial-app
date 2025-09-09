import { BudgetType } from '@/domain/entities/BudgetType';
import { IBudgetTypeRepository } from '@/domain/repositories/IBudgetTypeRepository';

export class GetAllBudgetTypes {
  constructor(private budgetTypeRepository: IBudgetTypeRepository) {}

  async execute(): Promise<BudgetType[]> {
    return this.budgetTypeRepository.findAll();
  }
}
