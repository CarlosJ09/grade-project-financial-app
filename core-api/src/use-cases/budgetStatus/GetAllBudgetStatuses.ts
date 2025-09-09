import { BudgetStatus } from '@/domain/entities/BudgetStatus';
import { IBudgetStatusRepository } from '@/domain/repositories/IBudgetStatusRepository';

export class GetAllBudgetStatuses {
  constructor(private budgetStatusRepository: IBudgetStatusRepository) {}

  async execute(): Promise<BudgetStatus[]> {
    return this.budgetStatusRepository.findAll();
  }
}
