import { Merchant } from '@/domain/entities/Merchant';
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
        transactionType: true,
        paymentMethod: true,
        merchant: true,
        userBankingProduct: true,
      },
      orderBy: {
        transactionDate: 'desc',
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
          transaction.transactionTypeId,
          transaction.categoryId,
          transaction.merchantId,
          transaction.userBankingProductId || null,
          transaction.paymentMethodId,
          transaction.transactionDate,
          transaction.createdAt,
          transaction.updatedAt,
          transaction.deletedAt || undefined,
          transaction.currency,
          transaction.exchangeRate || undefined,
          transaction.category,
          transaction.transactionType,
          transaction.paymentMethod,
          transaction.merchant
            ? new Merchant(
                transaction.merchant.id,
                transaction.merchant.name,
                transaction.merchant.categoryId,
                transaction.merchant.createdAt,
                transaction.merchant.updatedAt,
                transaction.merchant.website || undefined,
                transaction.merchant.location || undefined
              )
            : undefined,
          transaction.userBankingProduct || undefined
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
        transactionType: true,
        paymentMethod: true,
        merchant: true,
        userBankingProduct: true,
      },
    });

    if (!transaction) return null;

    return new Transaction(
      transaction.id,
      transaction.userId,
      transaction.amount,
      transaction.currencyId,
      transaction.exchangeRateId || null,
      transaction.transactionTypeId,
      transaction.categoryId,
      transaction.merchantId,
      transaction.userBankingProductId || null,
      transaction.paymentMethodId,
      transaction.transactionDate,
      transaction.createdAt,
      transaction.updatedAt,
      transaction.deletedAt || undefined,
      transaction.currency,
      transaction.exchangeRate || undefined,
      transaction.category,
      transaction.transactionType,
      transaction.paymentMethod,
      transaction.merchant
        ? new Merchant(
            transaction.merchant.id,
            transaction.merchant.name,
            transaction.merchant.categoryId,
            transaction.merchant.createdAt,
            transaction.merchant.updatedAt,
            transaction.merchant.website || undefined,
            transaction.merchant.location || undefined
          )
        : undefined,
      transaction.userBankingProduct || undefined
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
        transactionType: true,
        paymentMethod: true,
        merchant: true,
        userBankingProduct: true,
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
          transaction.transactionTypeId,
          transaction.categoryId,
          transaction.merchantId,
          transaction.userBankingProductId || null,
          transaction.paymentMethodId,
          transaction.transactionDate,
          transaction.createdAt,
          transaction.updatedAt,
          transaction.deletedAt || undefined,
          transaction.currency,
          transaction.exchangeRate || undefined,
          transaction.category,
          transaction.transactionType,
          transaction.paymentMethod,
          transaction.merchant
            ? new Merchant(
                transaction.merchant.id,
                transaction.merchant.name,
                transaction.merchant.categoryId,
                transaction.merchant.createdAt,
                transaction.merchant.updatedAt,
                transaction.merchant.website || undefined,
                transaction.merchant.location || undefined
              )
            : undefined,
          transaction.userBankingProduct || undefined
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
      | 'transactionType'
      | 'paymentMethod'
      | 'merchant'
      | 'userBankingProduct'
    >
  ): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: {
        userId: entity.userId,
        amount: entity.amount,
        currencyId: entity.currencyId,
        exchangeRateId: entity.exchangeRateId,
        transactionTypeId: entity.transactionTypeId,
        categoryId: entity.categoryId,
        merchantId: entity.merchantId,
        userBankingProductId: entity.userBankingProductId,
        paymentMethodId: entity.paymentMethodId,
        transactionDate: entity.transactionDate,
        deletedAt: entity.deletedAt,
      },
      include: {
        currency: true,
        exchangeRate: true,
        category: true,
        transactionType: true,
        paymentMethod: true,
        merchant: true,
        userBankingProduct: true,
      },
    });

    return new Transaction(
      transaction.id,
      transaction.userId,
      transaction.amount,
      transaction.currencyId,
      transaction.exchangeRateId || null,
      transaction.transactionTypeId,
      transaction.categoryId,
      transaction.merchantId,
      transaction.userBankingProductId || null,
      transaction.paymentMethodId,
      transaction.transactionDate,
      transaction.createdAt,
      transaction.updatedAt,
      transaction.deletedAt || undefined,
      transaction.currency,
      transaction.exchangeRate || undefined,
      transaction.category,
      transaction.transactionType,
      transaction.paymentMethod,
      transaction.merchant
        ? new Merchant(
            transaction.merchant.id,
            transaction.merchant.name,
            transaction.merchant.categoryId,
            transaction.merchant.createdAt,
            transaction.merchant.updatedAt,
            transaction.merchant.website || undefined,
            transaction.merchant.location || undefined
          )
        : undefined,
      transaction.userBankingProduct || undefined
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
        | 'transactionType'
        | 'paymentMethod'
        | 'merchant'
        | 'userBankingProduct'
      >
    >
  ): Promise<Transaction> {
    const updateData: any = {};

    if (entity.userId !== undefined) updateData.userId = entity.userId;
    if (entity.amount !== undefined) updateData.amount = entity.amount;
    if (entity.currencyId !== undefined)
      updateData.currencyId = entity.currencyId;
    if (entity.exchangeRateId !== undefined)
      updateData.exchangeRateId = entity.exchangeRateId;
    if (entity.transactionTypeId !== undefined)
      updateData.transactionTypeId = entity.transactionTypeId;
    if (entity.categoryId !== undefined)
      updateData.categoryId = entity.categoryId;
    if (entity.merchantId !== undefined)
      updateData.merchantId = entity.merchantId;
    if (entity.userBankingProductId !== undefined)
      updateData.userBankingProductId = entity.userBankingProductId;
    if (entity.paymentMethodId !== undefined)
      updateData.paymentMethodId = entity.paymentMethodId;
    if (entity.transactionDate !== undefined)
      updateData.transactionDate = entity.transactionDate;
    if (entity.deletedAt !== undefined) updateData.deletedAt = entity.deletedAt;

    const transaction = await this.prisma.transaction.update({
      where: { id },
      data: updateData,
      include: {
        currency: true,
        exchangeRate: true,
        category: true,
        transactionType: true,
        paymentMethod: true,
        merchant: true,
        userBankingProduct: true,
      },
    });

    return new Transaction(
      transaction.id,
      transaction.userId,
      transaction.amount,
      transaction.currencyId,
      transaction.exchangeRateId || null,
      transaction.transactionTypeId,
      transaction.categoryId,
      transaction.merchantId,
      transaction.userBankingProductId || null,
      transaction.paymentMethodId,
      transaction.transactionDate,
      transaction.createdAt,
      transaction.updatedAt,
      transaction.deletedAt || undefined,
      transaction.currency,
      transaction.exchangeRate || undefined,
      transaction.category,
      transaction.transactionType,
      transaction.paymentMethod,
      transaction.merchant
        ? new Merchant(
            transaction.merchant.id,
            transaction.merchant.name,
            transaction.merchant.categoryId,
            transaction.merchant.createdAt,
            transaction.merchant.updatedAt,
            transaction.merchant.website || undefined,
            transaction.merchant.location || undefined
          )
        : undefined,
      transaction.userBankingProduct || undefined
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.delete({
      where: { id },
    });
  }
}
