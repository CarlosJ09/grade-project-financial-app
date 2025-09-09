import { Decimal } from '@prisma/client/runtime/library';

export class CreateBudgetRequestDto {
  constructor(
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
    public readonly finishedDate: Date
  ) {}
}

export class UpdateBudgetRequestDto {
  constructor(
    public readonly name?: string,
    public readonly description?: string,
    public readonly currentAmount?: Decimal,
    public readonly goalAmount?: Decimal,
    public readonly currencyId?: number,
    public readonly statusId?: number,
    public readonly categoryId?: number,
    public readonly budgetAllocationId?: number,
    public readonly budgetExecutionId?: number,
    public readonly budgetTypeId?: number,
    public readonly startedDate?: Date,
    public readonly finishedDate?: Date
  ) {}
}
