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
    const transactions = await this.prisma.transaction.findMany({
      include: {
        currency: true,
        exchangeRate: true,
        category: true,
        paymentMethod: true,
        bankingProduct: true,
      },
    });
    return transactions.map(
      transaction =>
        new Transaction(
          transaction.id,
          transaction.userId,
          transaction.amount,
          transaction.currencyId,
          transaction.exchangeRateId || null,
          transaction.type,
          transaction.categoryId,
          transaction.paymentMethodId,
          transaction.place,
          transaction.bankingProductId || null,
          transaction.transactionDate,
          transaction.createdAt,
          transaction.updatedAt,
          transaction.deletedAt || undefined,
          transaction.currency,
          transaction.exchangeRate || undefined,
          transaction.category,
          transaction.paymentMethod,
          transaction.bankingProduct || undefined
        )
    );
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        currency: true,
        exchangeRate: true,
        category: true,
        paymentMethod: true,
        bankingProduct: true,
      },
    });

    if (!transaction) return null;

    return new Transaction(
      transaction.id,
      transaction.userId,
      transaction.amount,
      transaction.currencyId,
      transaction.exchangeRateId || null,
      transaction.type,
      transaction.categoryId,
      transaction.paymentMethodId,
      transaction.place,
      transaction.bankingProductId || null,
      transaction.transactionDate,
      transaction.createdAt,
      transaction.updatedAt,
      transaction.deletedAt || undefined,
      transaction.currency,
      transaction.exchangeRate || undefined,
      transaction.category,
      transaction.paymentMethod,
      transaction.bankingProduct || undefined
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
      include: {
        currency: true,
        exchangeRate: true,
        category: true,
        paymentMethod: true,
        bankingProduct: true,
      },
    });

    return transactions.map(
      transaction =>
        new Transaction(
          transaction.id,
          transaction.userId,
          transaction.amount,
          transaction.currencyId,
          transaction.exchangeRateId || null,
          transaction.type,
          transaction.categoryId,
          transaction.paymentMethodId,
          transaction.place,
          transaction.bankingProductId || null,
          transaction.transactionDate,
          transaction.createdAt,
          transaction.updatedAt,
          transaction.deletedAt || undefined,
          transaction.currency,
          transaction.exchangeRate || undefined,
          transaction.category,
          transaction.paymentMethod,
          transaction.bankingProduct || undefined
        )
    );
  }

  async create(
    entity: Omit<
      Transaction,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'currency'
      | 'exchangeRate'
      | 'category'
      | 'paymentMethod'
      | 'bankingProduct'
    >
  ): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: entity,
    });

    return new Transaction(
      transaction.id,
      transaction.userId,
      transaction.amount,
      transaction.currencyId,
      transaction.exchangeRateId || null,
      transaction.type,
      transaction.categoryId,
      transaction.paymentMethodId,
      transaction.place,
      transaction.bankingProductId || null,
      transaction.transactionDate,
      transaction.createdAt,
      transaction.updatedAt
    );
  }

  async update(
    id: string,
    entity: Partial<
      Omit<
        Transaction,
        | 'id'
        | 'createdAt'
        | 'updatedAt'
        | 'currency'
        | 'exchangeRate'
        | 'category'
        | 'paymentMethod'
        | 'bankingProduct'
      >
    >
  ): Promise<Transaction> {
    const transaction = await this.prisma.transaction.update({
      where: { id },
      data: entity,
    });

    return new Transaction(
      transaction.id,
      transaction.userId,
      transaction.amount,
      transaction.currencyId,
      transaction.exchangeRateId || null,
      transaction.type,
      transaction.categoryId,
      transaction.paymentMethodId,
      transaction.place,
      transaction.bankingProductId || null,
      transaction.transactionDate,
      transaction.createdAt,
      transaction.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.delete({
      where: { id },
    });
  }
}
