import { TransactionType } from '@/domain/entities/TransactionType';
import { ITransactionTypeRepository } from '@/domain/repositories/ITransactionTypeRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresTransactionTypeRepository
  implements ITransactionTypeRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<TransactionType[]> {
    const transactionTypes = await this.prisma.transactionType.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return transactionTypes.map(
      type =>
        new TransactionType(type.id, type.name, type.createdAt, type.updatedAt)
    );
  }

  async findById(id: number): Promise<TransactionType | null> {
    const transactionType = await this.prisma.transactionType.findUnique({
      where: { id },
    });

    if (!transactionType) return null;

    return new TransactionType(
      transactionType.id,
      transactionType.name,
      transactionType.createdAt,
      transactionType.updatedAt
    );
  }

  async findByName(name: string): Promise<TransactionType | null> {
    const transactionType = await this.prisma.transactionType.findUnique({
      where: { name },
    });

    if (!transactionType) return null;

    return new TransactionType(
      transactionType.id,
      transactionType.name,
      transactionType.createdAt,
      transactionType.updatedAt
    );
  }

  async create(
    entity: Omit<TransactionType, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<TransactionType> {
    const transactionType = await this.prisma.transactionType.create({
      data: {
        name: entity.name,
      },
    });

    return new TransactionType(
      transactionType.id,
      transactionType.name,
      transactionType.createdAt,
      transactionType.updatedAt
    );
  }

  async update(
    id: number,
    entity: Partial<Omit<TransactionType, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<TransactionType> {
    const updateData: any = {};

    if (entity.name !== undefined) updateData.name = entity.name;

    const transactionType = await this.prisma.transactionType.update({
      where: { id },
      data: updateData,
    });

    return new TransactionType(
      transactionType.id,
      transactionType.name,
      transactionType.createdAt,
      transactionType.updatedAt
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.transactionType.delete({
      where: { id },
    });
  }
}
