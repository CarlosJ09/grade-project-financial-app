import { Budget } from '@/domain/entities/Budget';
import { IBudgetRepository } from '@/domain/repositories/IBudgetRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresBudgetRepository implements IBudgetRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Budget[]> {
    const budgets = await this.prisma.budget.findMany({
      include: { currency: true, status: true },
    });
    return budgets.map(
      budget =>
        new Budget(
          budget.id,
          budget.userId,
          budget.name,
          budget.description,
          budget.currentAmount.toNumber(),
          budget.goalAmount.toNumber(),
          budget.currency.currency,
          budget.status.name,
          budget.startDate,
          budget.finishedDate,
          budget.createdAt,
          budget.updatedAt,
          budget.deletedAt || undefined
        )
    );
  }

  async findById(id: string): Promise<Budget | null> {
    const budget = await this.prisma.budget.findUnique({
      where: { id },
      include: { currency: true, status: true },
    });

    if (!budget) return null;

    return new Budget(
      budget.id,
      budget.userId,
      budget.name,
      budget.description,
      budget.currentAmount.toNumber(),
      budget.goalAmount.toNumber(),
      budget.currency.currency,
      budget.status.name,
      budget.startDate,
      budget.finishedDate,
      budget.createdAt,
      budget.updatedAt,
      budget.deletedAt || undefined
    );
  }

  async create(
    entity: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Budget> {
    // Map incoming entity to Prisma schema requirements
    // - currencyId: map currency code to Currency.id
    // - state: map to BudgetStatus.id via name
    const currency = await this.prisma.currency.findFirst({
      where: { currency: entity.currencyId },
    });

    if (!currency) {
      throw new Error(`Currency not found for code: ${entity.currencyId}`);
    }

    const status = await this.prisma.budgetStatus.findUnique({
      where: { name: (entity as any).state },
    });

    if (!status) {
      throw new Error(`Budget status not found for state: ${(entity as any).state}`);
    }

    const budget = await this.prisma.budget.create({
      data: {
        user: { connect: { id: entity.userId } },
        name: entity.name,
        description: entity.description,
        currentAmount: entity.currentAmount,
        goalAmount: entity.goalAmount,
        currency: { connect: { id: currency.id } },
        status: { connect: { id: status.id } },
        startDate: entity.startDate,
        finishedDate: entity.finishedDate,
      },
      include: { currency: true, status: true },
    });

    return new Budget(
      budget.id,
      budget.userId,
      budget.name,
      budget.description,
      budget.currentAmount.toNumber(),
      budget.goalAmount.toNumber(),
      budget.currency.currency,
      budget.status.name,
      budget.startDate,
      budget.finishedDate,
      budget.createdAt,
      budget.updatedAt,
      budget.deletedAt || undefined
    );
  }

  async update(
    id: string,
    entity: Partial<Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Budget> {
    // Build Prisma update data without passing FK scalars directly
    const data: any = {};
    if (entity.name !== undefined) data.name = entity.name;
    if (entity.description !== undefined) data.description = entity.description;
    if (entity.currentAmount !== undefined)
      data.currentAmount = entity.currentAmount;
    if (entity.goalAmount !== undefined) data.goalAmount = entity.goalAmount;
    if (entity.startDate !== undefined) data.startDate = entity.startDate;
    if (entity.finishedDate !== undefined)
      data.finishedDate = entity.finishedDate;

    if ((entity as any).currencyId) {
      const currency = await this.prisma.currency.findFirst({
        where: { currency: (entity as any).currencyId },
      });
      if (!currency) {
        throw new Error(
          `Currency not found for code: ${(entity as any).currencyId}`
        );
      }
      data.currency = { connect: { id: currency.id } };
    }

    if ((entity as any).state) {
      const status = await this.prisma.budgetStatus.findUnique({
        where: { name: (entity as any).state },
      });
      if (!status) {
        throw new Error(`Budget status not found for state: ${(entity as any).state}`);
      }
      data.status = { connect: { id: status.id } };
    }

    const budget = await this.prisma.budget.update({
      where: { id },
      data,
      include: { currency: true, status: true },
    });

    return new Budget(
      budget.id,
      budget.userId,
      budget.name,
      budget.description,
      budget.currentAmount.toNumber(),
      budget.goalAmount.toNumber(),
      budget.currency.currency,
      budget.status.name,
      budget.startDate,
      budget.finishedDate,
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
