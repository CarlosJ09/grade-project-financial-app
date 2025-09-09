import { BudgetType } from '@/domain/entities/BudgetType';
import { IBudgetTypeRepository } from '@/domain/repositories/IBudgetTypeRepository';

export class GetBudgetTypeById {
  constructor(private budgetTypeRepository: IBudgetTypeRepository) {}

  async execute(id: number): Promise<BudgetType | null> {
    return this.budgetTypeRepository.findById(id);
  }
}
