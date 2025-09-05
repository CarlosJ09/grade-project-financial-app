import { Budget } from '@/domain/entities/Budget';
import { BudgetStatus } from '@/domain/entities/BudgetStatus';
import { Category } from '@/domain/entities/Category';
import { Currency } from '@/domain/entities/Currency';

export class BudgetResponseDto {
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
    public readonly currency?: Currency
  ) {}

  static fromEntity(budget: Budget): BudgetResponseDto {
    return new BudgetResponseDto(
      budget.id,
      budget.userId,
      budget.name,
      budget.description,
      budget.currentAmount,
      budget.goalAmount,
      budget.currencyId,
      budget.categoryId,
      budget.statusId,
      budget.startDate,
      budget.finishedDate,
      budget.createdAt,
      budget.updatedAt,
      budget.status,
      budget.category,
      budget.currency
    );
  }
}
