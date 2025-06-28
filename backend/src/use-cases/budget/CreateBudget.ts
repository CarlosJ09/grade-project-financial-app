import { IBudgetRepository } from '@/domain/repositories/IBudgetRepository';
import { Budget } from '@/domain/entities/Budget';

export type CreateBudgetInput = {
  userId: string;
  name: string;
  description: string;
  currentAmount: number;
  goalAmount: number;
  currencyId: string;
  startDate: Date;
  finishedDate: Date;
  state: string;
};

export class CreateBudget {
  constructor(private budgetRepository: IBudgetRepository) {}

  async execute(input: CreateBudgetInput): Promise<Budget> {
    return this.budgetRepository.create(input);
  }
}
