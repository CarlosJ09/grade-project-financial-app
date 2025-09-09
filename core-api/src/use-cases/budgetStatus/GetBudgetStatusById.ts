import { BudgetStatus } from '@/domain/entities/BudgetStatus';
import { IBudgetStatusRepository } from '@/domain/repositories/IBudgetStatusRepository';

export class GetBudgetStatusById {
  constructor(private budgetStatusRepository: IBudgetStatusRepository) {}

  async execute(id: number): Promise<BudgetStatus | null> {
    return this.budgetStatusRepository.findById(id);
  }
}
