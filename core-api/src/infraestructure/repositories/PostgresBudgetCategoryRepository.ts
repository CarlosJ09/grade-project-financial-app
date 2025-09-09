import { BudgetCategory } from '@/domain/entities/BudgetCategory';
import { IBudgetCategoryRepository } from '@/domain/repositories/IBudgetCategoryRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresBudgetCategoryRepository
  implements IBudgetCategoryRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<BudgetCategory[]> {
    const budgetCategories = await this.prisma.budgetCategory.findMany({
      include: {
        budgetType: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return budgetCategories.map(
      category =>
        new BudgetCategory(
          category.id,
          category.name,
          category.budgetTypeId,
          category.createdAt,
          category.updatedAt,
          category.budgetType
        )
    );
  }

  async findById(id: number): Promise<BudgetCategory | null> {
    const budgetCategory = await this.prisma.budgetCategory.findUnique({
      where: { id },
      include: {
        budgetType: true,
      },
    });

    if (!budgetCategory) return null;

    return new BudgetCategory(
      budgetCategory.id,
      budgetCategory.name,
      budgetCategory.budgetTypeId,
      budgetCategory.createdAt,
      budgetCategory.updatedAt,
      budgetCategory.budgetType
    );
  }

  async findByBudgetTypeId(budgetTypeId: number): Promise<BudgetCategory[]> {
    const budgetCategories = await this.prisma.budgetCategory.findMany({
      where: { budgetTypeId },
      include: {
        budgetType: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return budgetCategories.map(
      category =>
        new BudgetCategory(
          category.id,
          category.name,
          category.budgetTypeId,
          category.createdAt,
          category.updatedAt,
          category.budgetType
        )
    );
  }

  async create(
    entity: Omit<
      BudgetCategory,
      'id' | 'createdAt' | 'updatedAt' | 'budgetType'
    >
  ): Promise<BudgetCategory> {
    const budgetCategory = await this.prisma.budgetCategory.create({
      data: {
        name: entity.name,
        budgetTypeId: entity.budgetTypeId,
      },
      include: {
        budgetType: true,
      },
    });

    return new BudgetCategory(
      budgetCategory.id,
      budgetCategory.name,
      budgetCategory.budgetTypeId,
      budgetCategory.createdAt,
      budgetCategory.updatedAt,
      budgetCategory.budgetType
    );
  }

  async update(
    id: number,
    entity: Partial<
      Omit<BudgetCategory, 'id' | 'createdAt' | 'updatedAt' | 'budgetType'>
    >
  ): Promise<BudgetCategory> {
    const updateData: any = {};

    if (entity.name !== undefined) updateData.name = entity.name;
    if (entity.budgetTypeId !== undefined)
      updateData.budgetTypeId = entity.budgetTypeId;

    const budgetCategory = await this.prisma.budgetCategory.update({
      where: { id },
      data: updateData,
      include: {
        budgetType: true,
      },
    });

    return new BudgetCategory(
      budgetCategory.id,
      budgetCategory.name,
      budgetCategory.budgetTypeId,
      budgetCategory.createdAt,
      budgetCategory.updatedAt,
      budgetCategory.budgetType
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.budgetCategory.delete({
      where: { id },
    });
  }
}
