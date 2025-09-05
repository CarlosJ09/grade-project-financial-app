import { Budget } from '@/domain/entities/Budget';
import { IBudgetRepository } from '@/domain/repositories/IBudgetRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface BudgetFilters {
  fromDate?: Date;
  toDate?: Date;
  excludeDeleted?: boolean;
}

export class PostgresBudgetRepository implements IBudgetRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Budget[]> {
    const budgets = await this.prisma.budget.findMany({
      include: { currency: true, status: true, category: true },
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
          budget.categoryId,
          budget.currencyId,
          budget.statusId,
          budget.startDate,
          budget.finishedDate,
          budget.createdAt,
          budget.updatedAt,
          budget.status,
          budget.category,
          budget.currency
        )
    );
  }

  async findById(id: string): Promise<Budget | null> {
    const budget = await this.prisma.budget.findUnique({
      where: { id },
      include: { currency: true, status: true, category: true },
    });

    const category = await this.prisma.category.findUnique({
      where: { id: budget?.categoryId },
    });

    if (!budget || !category) return null;

    return new Budget(
      budget.id,
      budget.userId,
      budget.name,
      budget.description,
      budget.currentAmount.toNumber(),
      budget.goalAmount.toNumber(),
      budget.categoryId,
      budget.currencyId,
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

  async findByUserId(
    userId: string,
    filters?: BudgetFilters
  ): Promise<Budget[]> {
    const whereClause: any = {
      userId,
    };

    if (filters?.excludeDeleted) {
      whereClause.deletedAt = null;
    }

    if (filters?.fromDate) {
      whereClause.transactionDate = {
        ...whereClause.transactionDate,
        gte: filters.fromDate,
      };
    }

    if (filters?.toDate) {
      whereClause.transactionDate = {
        ...whereClause.transactionDate,
        lte: filters.toDate,
      };
    }

    const budgets = await this.prisma.budget.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        currency: true,
        category: true,
        status: true,
      },
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
          budget.categoryId,
          budget.currencyId,
          budget.statusId,
          budget.startDate,
          budget.finishedDate,
          budget.createdAt,
          budget.updatedAt,
          budget.status,
          budget.category,
          budget.currency
        )
    );
  }

  async create(
    entity: Omit<
      Budget,
      'id' | 'createdAt' | 'updatedAt' | 'currency' | 'status' | 'category'
    >
  ): Promise<Budget> {
    // Map incoming entity to Prisma schema requirements
    // - currencyId: map currency code to Currency.id
    // - state: map to BudgetStatus.id via name
    const currency = await this.prisma.currency.findFirst({
      where: { id: entity.currencyId },
    });

    if (!currency) {
      throw new Error(`Currency not found for code: ${entity.currencyId}`);
    }

    const status = await this.prisma.budgetStatus.findUnique({
      where: { id: entity.statusId },
    });

    if (!status) {
      throw new Error(`Budget status not found for id: ${entity.statusId}`);
    }

    const budget = await this.prisma.budget.create({
      data: {
        user: { connect: { id: entity.userId } },
        name: entity.name,
        description: entity.description,
        currentAmount: entity.currentAmount,
        goalAmount: entity.goalAmount,
        category: { connect: { id: entity.categoryId } },
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
      budget.currencyId,
      budget.categoryId,
      budget.statusId,
      budget.startDate,
      budget.finishedDate,
      budget.createdAt,
      budget.updatedAt
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

    if (entity.currencyId) {
      const currency = await this.prisma.currency.findFirst({
        where: { id: entity.currencyId },
      });
      if (!currency) {
        throw new Error(`Currency not found for code: ${entity.currencyId}`);
      }
      data.currency = { connect: { id: currency.id } };
    }

    if (entity.statusId) {
      const status = await this.prisma.budgetStatus.findUnique({
        where: { id: entity.statusId },
      });
      if (!status) {
        throw new Error(`Budget status not found for id: ${entity.statusId}`);
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
      budget.currencyId,
      budget.categoryId,
      budget.statusId,
      budget.startDate,
      budget.finishedDate,
      budget.createdAt,
      budget.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.budget.delete({
      where: { id },
    });
  }
}
