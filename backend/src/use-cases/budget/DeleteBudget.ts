import { IBudgetRepository } from '@/domain/repositories/IBudgetRepository';

export class DeleteBudget {
  constructor(private budgetRepository: IBudgetRepository) {}

  async execute(id: string): Promise<boolean> {
    try {
      await this.budgetRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
