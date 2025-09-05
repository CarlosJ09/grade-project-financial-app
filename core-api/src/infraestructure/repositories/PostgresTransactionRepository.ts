import { Transaction } from '@/domain/entities/Transaction';
import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface TransactionFilters {
  fromDate?: Date;
  toDate?: Date;
  excludeDeleted?: boolean;
}

export class PostgresTransactionRepository implements ITransactionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany();
    return transactions.map(
      transaction =>
        new Transaction(
          transaction.id,
          transaction.userId,
          transaction.amount.toNumber(),
          transaction.currencyId.toString(),
          transaction.exchangeRateId?.toString() || null,
          transaction.type,
          transaction.categoryId.toString(),
          transaction.paymentMethodId.toString(),
          transaction.place,
          transaction.bankingProductId?.toString() || null,
          transaction.transactionDate,
          transaction.createdAt,
          transaction.updatedAt,
          transaction.deletedAt || undefined
        )
    );
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) return null;

    return new Transaction(
      transaction.id,
      transaction.userId,
      transaction.amount.toNumber(),
      transaction.currencyId.toString(),
      transaction.exchangeRateId?.toString() || null,
      transaction.type,
      transaction.categoryId.toString(),
      transaction.paymentMethodId.toString(),
      transaction.place,
      transaction.bankingProductId?.toString() || null,
      transaction.transactionDate,
      transaction.createdAt,
      transaction.updatedAt,
      transaction.deletedAt || undefined
    );
  }

  async findByUserId(
    userId: string,
    filters?: TransactionFilters
  ): Promise<Transaction[]> {
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

    const transactions = await this.prisma.transaction.findMany({
      where: whereClause,
      orderBy: {
        transactionDate: 'desc',
      },
    });

    return transactions.map(
      transaction =>
        new Transaction(
          transaction.id,
          transaction.userId,
          transaction.amount.toNumber(),
          transaction.currencyId.toString(),
          transaction.exchangeRateId?.toString() || null,
          transaction.type,
          transaction.categoryId.toString(),
          transaction.paymentMethodId.toString(),
          transaction.place,
          transaction.bankingProductId?.toString() || null,
          transaction.transactionDate,
          transaction.createdAt,
          transaction.updatedAt,
          transaction.deletedAt || undefined
        )
    );
  }

  async create(
    entity: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: entity,
    });

    return new Transaction(
      transaction.id,
      transaction.userId,
      transaction.amount.toNumber(),
      transaction.currencyId.toString(),
      transaction.exchangeRateId?.toString() || null,
      transaction.type,
      transaction.categoryId.toString(),
      transaction.paymentMethodId.toString(),
      transaction.place,
      transaction.bankingProductId?.toString() || null,
      transaction.transactionDate,
      transaction.createdAt,
      transaction.updatedAt,
      transaction.deletedAt || undefined
    );
  }

  async update(
    id: string,
    entity: Partial<Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Transaction> {
    const transaction = await this.prisma.transaction.update({
      where: { id },
      data: entity,
    });

    return new Transaction(
      transaction.id,
      transaction.userId,
      transaction.amount.toNumber(),
      transaction.currencyId.toString(),
      transaction.exchangeRateId?.toString() || null,
      transaction.type,
      transaction.categoryId.toString(),
      transaction.paymentMethodId.toString(),
      transaction.place,
      transaction.bankingProductId?.toString() || null,
      transaction.transactionDate,
      transaction.createdAt,
      transaction.updatedAt,
      transaction.deletedAt || undefined
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.delete({
      where: { id },
    });
  }
}
