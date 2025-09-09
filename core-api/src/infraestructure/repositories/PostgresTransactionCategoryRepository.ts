import { TransactionCategory } from '@/domain/entities/TransactionCategory';
import { ITransactionCategoryRepository } from '@/domain/repositories/ITransactionCategoryRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresTransactionCategoryRepository
  implements ITransactionCategoryRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<TransactionCategory[]> {
    const transactionCategories =
      await this.prisma.transactionCategory.findMany({
        orderBy: {
          name: 'asc',
        },
      });

    return transactionCategories.map(
      category =>
        new TransactionCategory(
          category.id,
          category.name,
          category.createdAt,
          category.updatedAt
        )
    );
  }

  async findById(id: number): Promise<TransactionCategory | null> {
    const transactionCategory =
      await this.prisma.transactionCategory.findUnique({
        where: { id },
      });

    if (!transactionCategory) return null;

    return new TransactionCategory(
      transactionCategory.id,
      transactionCategory.name,
      transactionCategory.createdAt,
      transactionCategory.updatedAt
    );
  }

  async findByName(name: string): Promise<TransactionCategory | null> {
    const transactionCategory =
      await this.prisma.transactionCategory.findUnique({
        where: { name },
      });

    if (!transactionCategory) return null;

    return new TransactionCategory(
      transactionCategory.id,
      transactionCategory.name,
      transactionCategory.createdAt,
      transactionCategory.updatedAt
    );
  }

  async create(
    entity: Omit<TransactionCategory, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<TransactionCategory> {
    const transactionCategory = await this.prisma.transactionCategory.create({
      data: {
        name: entity.name,
      },
    });

    return new TransactionCategory(
      transactionCategory.id,
      transactionCategory.name,
      transactionCategory.createdAt,
      transactionCategory.updatedAt
    );
  }

  async update(
    id: number,
    entity: Partial<Omit<TransactionCategory, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<TransactionCategory> {
    const updateData: any = {};

    if (entity.name !== undefined) updateData.name = entity.name;

    const transactionCategory = await this.prisma.transactionCategory.update({
      where: { id },
      data: updateData,
    });

    return new TransactionCategory(
      transactionCategory.id,
      transactionCategory.name,
      transactionCategory.createdAt,
      transactionCategory.updatedAt
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.transactionCategory.delete({
      where: { id },
    });
  }
}
