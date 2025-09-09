import { Budget } from '@/domain/entities/Budget';
import { IBudgetRepository } from '@/domain/repositories/IBudgetRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresBudgetRepository implements IBudgetRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Budget[]> {
    const budgets = await this.prisma.budget.findMany({
      include: {
        currency: true,
        status: true,
        category: true,
        budgetType: true,
      },
    });

    return budgets.map(
      budget =>
        new Budget(
          budget.id,
          budget.userId,
          budget.name,
          budget.description,
          budget.currentAmount,
          budget.goalAmount,
          budget.currencyId,
          budget.statusId,
          budget.categoryId,
          budget.budgetAllocationId,
          budget.budgetExecutionId,
          budget.budgetTypeId,
          budget.startedDate,
          budget.finishedDate,
          budget.createdAt,
          budget.updatedAt,
          budget.deletedAt || undefined,
          budget.currency,
          budget.status,
          budget.category,
          budget.budgetType
        )
    );
  }

  async findById(id: string): Promise<Budget | null> {
    const budget = await this.prisma.budget.findUnique({
      where: { id },
      include: {
        currency: true,
        status: true,
        category: true,
        budgetType: true,
      },
    });

    if (!budget) return null;

    return new Budget(
      budget.id,
      budget.userId,
      budget.name,
      budget.description,
      budget.currentAmount,
      budget.goalAmount,
      budget.currencyId,
      budget.statusId,
      budget.categoryId,
      budget.budgetAllocationId,
      budget.budgetExecutionId,
      budget.budgetTypeId,
      budget.startedDate,
      budget.finishedDate,
      budget.createdAt,
      budget.updatedAt,
      budget.deletedAt || undefined,
      budget.currency,
      budget.status,
      budget.category,
      budget.budgetType
    );
  }

  async create(
    entity: Omit<
      Budget,
      'id' | 'createdAt' | 'updatedAt' | 'currency' | 'status' | 'category'
    >
  ): Promise<Budget> {
    const budget = await this.prisma.budget.create({
      data: {
        userId: entity.userId,
        name: entity.name,
        description: entity.description,
        currentAmount: entity.currentAmount,
        goalAmount: entity.goalAmount,
        currencyId: entity.currencyId,
        statusId: entity.statusId,
        categoryId: entity.categoryId,
        budgetAllocationId: entity.budgetAllocationId,
        budgetExecutionId: entity.budgetExecutionId,
        budgetTypeId: entity.budgetTypeId,
        startedDate: entity.startedDate,
        finishedDate: entity.finishedDate,
        deletedAt: entity.deletedAt,
      },
      include: {
        currency: true,
        status: true,
        category: true,
        budgetType: true,
      },
    });

    return new Budget(
      budget.id,
      budget.userId,
      budget.name,
      budget.description,
      budget.currentAmount,
      budget.goalAmount,
      budget.currencyId,
      budget.statusId,
      budget.categoryId,
      budget.budgetAllocationId,
      budget.budgetExecutionId,
      budget.budgetTypeId,
      budget.startedDate,
      budget.finishedDate,
      budget.createdAt,
      budget.updatedAt,
      budget.deletedAt || undefined,
      budget.currency,
      budget.status,
      budget.category,
      budget.budgetType
    );
  }

  async update(
    id: string,
    entity: Partial<
      Omit<
        Budget,
        'id' | 'createdAt' | 'updatedAt' | 'currency' | 'status' | 'category'
      >
    >
  ): Promise<Budget> {
    const updateData: any = {};

    if (entity.userId !== undefined) updateData.userId = entity.userId;
    if (entity.name !== undefined) updateData.name = entity.name;
    if (entity.description !== undefined)
      updateData.description = entity.description;
    if (entity.currentAmount !== undefined)
      updateData.currentAmount = entity.currentAmount;
    if (entity.goalAmount !== undefined)
      updateData.goalAmount = entity.goalAmount;
    if (entity.currencyId !== undefined)
      updateData.currencyId = entity.currencyId;
    if (entity.statusId !== undefined) updateData.statusId = entity.statusId;
    if (entity.categoryId !== undefined)
      updateData.categoryId = entity.categoryId;
    if (entity.budgetAllocationId !== undefined)
      updateData.budgetAllocationId = entity.budgetAllocationId;
    if (entity.budgetExecutionId !== undefined)
      updateData.budgetExecutionId = entity.budgetExecutionId;
    if (entity.budgetTypeId !== undefined)
      updateData.budgetTypeId = entity.budgetTypeId;
    if (entity.startedDate !== undefined)
      updateData.startedDate = entity.startedDate;
    if (entity.finishedDate !== undefined)
      updateData.finishedDate = entity.finishedDate;
    if (entity.deletedAt !== undefined) updateData.deletedAt = entity.deletedAt;

    const budget = await this.prisma.budget.update({
      where: { id },
      data: updateData,
      include: {
        currency: true,
        status: true,
        category: true,
        budgetType: true,
      },
    });

    return new Budget(
      budget.id,
      budget.userId,
      budget.name,
      budget.description,
      budget.currentAmount,
      budget.goalAmount,
      budget.currencyId,
      budget.statusId,
      budget.categoryId,
      budget.budgetAllocationId,
      budget.budgetExecutionId,
      budget.budgetTypeId,
      budget.startedDate,
      budget.finishedDate,
      budget.createdAt,
      budget.updatedAt,
      budget.deletedAt || undefined,
      budget.currency,
      budget.status,
      budget.category,
      budget.budgetType
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.budget.delete({
      where: { id },
    });
  }
}
