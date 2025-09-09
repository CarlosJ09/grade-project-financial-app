import { Budget } from '@/domain/entities/Budget';
import { IBudgetRepository } from '@/domain/repositories/IBudgetRepository';
import { Decimal } from '@prisma/client/runtime/library';

export type UpdateBudgetInput = {
  name?: string;
  description?: string;
  currentAmount?: Decimal;
  goalAmount?: Decimal;
  currencyId?: number;
  statusId?: number;
  categoryId?: number;
  budgetAllocationId?: number;
  budgetExecutionId?: number;
  budgetTypeId?: number;
  startedDate?: Date;
  finishedDate?: Date;
};

export class UpdateBudget {
  constructor(private budgetRepository: IBudgetRepository) {}

  async execute(id: string, input: UpdateBudgetInput): Promise<Budget> {
    return this.budgetRepository.update(id, input);
  }
}
