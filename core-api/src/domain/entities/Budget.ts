import { BudgetCategory } from '@/domain/entities/BudgetCategory';
import { BudgetStatus } from '@/domain/entities/BudgetStatus';
import { Currency } from '@/domain/entities/Currency';

class Budget {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly currentAmount: number,
    public readonly goalAmount: number,
    public readonly currencyId: number,
    public readonly categoryId: number,
    public readonly statusId: number,
    public readonly budgetAllocationId: number,
    public readonly budgetExecutionId: number,
    public readonly startedDate: Date,
    public readonly finishedDate: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly status?: BudgetStatus,
    public readonly category?: BudgetCategory,
    public readonly currency?: Currency,
    public readonly deletedAt?: Date | undefined
  ) {}
}

export { Budget };
