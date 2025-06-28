import { Budget } from '@/domain/entities/Budget';
import { IBudgetRepository } from '@/domain/repositories/IBudgetRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresBudgetRepository implements IBudgetRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Budget[]> {
    const budgets = await this.prisma.budget.findMany();
    return budgets.map(
      budget =>
        new Budget(
          budget.id,
          budget.userId,
          budget.name,
          budget.description,
          budget.currentAmount.toNumber(),
          budget.goalAmount.toNumber(),
          budget.currencyId,
          budget.startDate,
          budget.finishedDate,
          budget.state,
          budget.createdAt,
          budget.updatedAt,
          budget.deletedAt || undefined
        )
    );
  }

  async findById(id: string): Promise<Budget | null> {
    const budget = await this.prisma.budget.findUnique({
      where: { id },
    });

    if (!budget) return null;

    return new Budget(
      budget.id,
      budget.userId,
      budget.name,
      budget.description,
      budget.currentAmount.toNumber(),
      budget.goalAmount.toNumber(),
      budget.currencyId,
      budget.startDate,
      budget.finishedDate,
      budget.state,
      budget.createdAt,
      budget.updatedAt,
      budget.deletedAt || undefined
    );
  }

  async create(
    entity: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Budget> {
    const budget = await this.prisma.budget.create({
      data: entity,
    });

    return new Budget(
      budget.id,
      budget.userId,
      budget.name,
      budget.description,
      budget.currentAmount.toNumber(),
      budget.goalAmount.toNumber(),
      budget.currencyId,
      budget.startDate,
      budget.finishedDate,
      budget.state,
      budget.createdAt,
      budget.updatedAt,
      budget.deletedAt || undefined
    );
  }

  async update(
    id: string,
    entity: Partial<Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Budget> {
    const budget = await this.prisma.budget.update({
      where: { id },
      data: entity,
    });

    return new Budget(
      budget.id,
      budget.userId,
      budget.name,
      budget.description,
      budget.currentAmount.toNumber(),
      budget.goalAmount.toNumber(),
      budget.currencyId,
      budget.startDate,
      budget.finishedDate,
      budget.state,
      budget.createdAt,
      budget.updatedAt,
      budget.deletedAt || undefined
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.budget.delete({
      where: { id },
    });
  }
}
