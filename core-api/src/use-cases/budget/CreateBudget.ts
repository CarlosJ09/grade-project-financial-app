import { Budget } from '@/domain/entities/Budget';
import { IBudgetRepository } from '@/domain/repositories/IBudgetRepository';
import { Decimal } from '@prisma/client/runtime/library';

export type CreateBudgetInput = {
  userId: string;
  name: string;
  description: string;
  currentAmount: Decimal;
  goalAmount: Decimal;
  currencyId: number;
  statusId: number;
  categoryId: number;
  budgetAllocationId: number;
  budgetExecutionId: number;
  budgetTypeId: number;
  startedDate: Date;
  finishedDate: Date;
};

export class CreateBudget {
  constructor(private budgetRepository: IBudgetRepository) {}

  async execute(input: CreateBudgetInput): Promise<Budget> {
    return this.budgetRepository.create(input);
  }
}
