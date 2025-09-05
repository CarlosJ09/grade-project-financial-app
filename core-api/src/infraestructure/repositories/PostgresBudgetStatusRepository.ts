import { BudgetStatus } from '@/domain/entities/BudgetStatus';
import { IBudgetStatusRepository } from '@/domain/repositories/IBudgetStatusRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresBudgetStatusRepository implements IBudgetStatusRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<BudgetStatus[]> {
    const budgetStatuses = await this.prisma.budgetStatus.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return budgetStatuses.map(
      status =>
        new BudgetStatus(
          status.id,
          status.name,
          status.description,
          status.createdAt,
          status.updatedAt
        )
    );
  }

  async findById(id: string): Promise<BudgetStatus | null> {
    const budgetStatus = await this.prisma.budgetStatus.findUnique({
      where: { id: parseInt(id) },
    });

    if (!budgetStatus) return null;

    return new BudgetStatus(
      budgetStatus.id,
      budgetStatus.name,
      budgetStatus.description,
      budgetStatus.createdAt,
      budgetStatus.updatedAt
    );
  }

  async findByName(name: string): Promise<BudgetStatus | null> {
    const budgetStatus = await this.prisma.budgetStatus.findUnique({
      where: { name },
    });

    if (!budgetStatus) return null;

    return new BudgetStatus(
      budgetStatus.id,
      budgetStatus.name,
      budgetStatus.description,
      budgetStatus.createdAt,
      budgetStatus.updatedAt
    );
  }

  async create(
    entity: Omit<BudgetStatus, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<BudgetStatus> {
    const budgetStatus = await this.prisma.budgetStatus.create({
      data: {
        name: entity.name,
        description: entity.description,
      },
    });

    return new BudgetStatus(
      budgetStatus.id,
      budgetStatus.name,
      budgetStatus.description,
      budgetStatus.createdAt,
      budgetStatus.updatedAt
    );
  }

  async update(
    id: string,
    entity: Partial<Omit<BudgetStatus, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<BudgetStatus> {
    const budgetStatus = await this.prisma.budgetStatus.update({
      where: { id: parseInt(id) },
      data: {
        name: entity.name,
        description: entity.description,
      },
    });

    return new BudgetStatus(
      budgetStatus.id,
      budgetStatus.name,
      budgetStatus.description,
      budgetStatus.createdAt,
      budgetStatus.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.budgetStatus.delete({
      where: { id: parseInt(id) },
    });
  }
}
