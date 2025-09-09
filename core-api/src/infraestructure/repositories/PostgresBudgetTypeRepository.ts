import { BudgetType } from '@/domain/entities/BudgetType';
import { IBudgetTypeRepository } from '@/domain/repositories/IBudgetTypeRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresBudgetTypeRepository implements IBudgetTypeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<BudgetType[]> {
    const budgetTypes = await this.prisma.budgetType.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return budgetTypes.map(
      type =>
        new BudgetType(
          type.id,
          type.name,
          type.description,
          type.createdAt,
          type.updatedAt
        )
    );
  }

  async findById(id: number): Promise<BudgetType | null> {
    const budgetType = await this.prisma.budgetType.findUnique({
      where: { id },
    });

    if (!budgetType) return null;

    return new BudgetType(
      budgetType.id,
      budgetType.name,
      budgetType.description,
      budgetType.createdAt,
      budgetType.updatedAt
    );
  }

  async findByName(name: string): Promise<BudgetType | null> {
    const budgetType = await this.prisma.budgetType.findUnique({
      where: { name },
    });

    if (!budgetType) return null;

    return new BudgetType(
      budgetType.id,
      budgetType.name,
      budgetType.description,
      budgetType.createdAt,
      budgetType.updatedAt
    );
  }

  async create(
    entity: Omit<BudgetType, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<BudgetType> {
    const budgetType = await this.prisma.budgetType.create({
      data: {
        name: entity.name,
        description: entity.description,
      },
    });

    return new BudgetType(
      budgetType.id,
      budgetType.name,
      budgetType.description,
      budgetType.createdAt,
      budgetType.updatedAt
    );
  }

  async update(
    id: number,
    entity: Partial<Omit<BudgetType, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<BudgetType> {
    const updateData: any = {};

    if (entity.name !== undefined) updateData.name = entity.name;
    if (entity.description !== undefined)
      updateData.description = entity.description;

    const budgetType = await this.prisma.budgetType.update({
      where: { id },
      data: updateData,
    });

    return new BudgetType(
      budgetType.id,
      budgetType.name,
      budgetType.description,
      budgetType.createdAt,
      budgetType.updatedAt
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.budgetType.delete({
      where: { id },
    });
  }
}
