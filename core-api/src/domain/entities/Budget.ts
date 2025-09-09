import { BudgetCategory } from '@/domain/entities/BudgetCategory';
import { BudgetStatus } from '@/domain/entities/BudgetStatus';
import { BudgetType } from '@/domain/entities/BudgetType';
import { Currency } from '@/domain/entities/Currency';
import { Decimal } from '@prisma/client/runtime/library';

class Budget {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly currentAmount: Decimal,
    public readonly goalAmount: Decimal,
    public readonly currencyId: number,
    public readonly statusId: number,
    public readonly categoryId: number,
    public readonly budgetAllocationId: number,
    public readonly budgetExecutionId: number,
    public readonly budgetTypeId: number,
    public readonly startedDate: Date,
    public readonly finishedDate: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt?: Date,
    public readonly currency?: Currency,
    public readonly status?: BudgetStatus,
    public readonly category?: BudgetCategory,
    public readonly budgetType?: BudgetType
  ) {}
}

export { Budget };
