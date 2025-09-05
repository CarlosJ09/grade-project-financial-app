import { BudgetStatus } from '@/domain/entities/BudgetStatus';
import { Category } from '@/domain/entities/Category';
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
    public readonly startDate: Date,
    public readonly finishedDate: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly status?: BudgetStatus,
    public readonly category?: Category,
    public readonly currency?: Currency,
    public readonly deletedAt?: Date | undefined
  ) {}
}

export { Budget };
