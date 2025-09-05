import { Budget } from '@/domain/entities/Budget';

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
    public readonly updatedAt: Date
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
      budget.updatedAt
    );
  }
}
