import { Decimal } from '@prisma/client/runtime/library';

class BudgetAllocation {
  constructor(
    public readonly id: number,
    public readonly budgetId: string,
    public readonly amount: Decimal,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export { BudgetAllocation };
