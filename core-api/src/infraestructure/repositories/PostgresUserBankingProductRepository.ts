import { BankBankingProduct } from '@/domain/entities/BankBankingProduct';
import { UserBankingProduct } from '@/domain/entities/UserBankingProduct';
import { IUserBankingProductRepository } from '@/domain/repositories/IUserBankingProductRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';
import { Decimal } from '@prisma/client/runtime/library';

export class PostgresUserBankingProductRepository
  implements IUserBankingProductRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<UserBankingProduct[]> {
    const userBankingProducts = await this.prisma.userBankingProduct.findMany({
      include: {
        currency: true,
        bankBankingProduct: {
          include: {
            bank: true,
            bankingProduct: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return userBankingProducts.map(product => this.mapToEntity(product));
  }

  async findAllByUserId(userId: string): Promise<UserBankingProduct[]> {
    const userBankingProducts = await this.prisma.userBankingProduct.findMany({
      where: { userId },
      include: {
        currency: true,
        bankBankingProduct: {
          include: {
            bank: true,
            bankingProduct: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return userBankingProducts.map(product => this.mapToEntity(product));
  }

  async findById(id: string): Promise<UserBankingProduct | null> {
    const userBankingProduct = await this.prisma.userBankingProduct.findUnique({
      where: { id },
      include: {
        currency: true,
        bankBankingProduct: {
          include: {
            bank: true,
            bankingProduct: true,
          },
        },
      },
    });

    if (!userBankingProduct) return null;

    return this.mapToEntity(userBankingProduct);
  }

  async create(
    entity: Omit<
      UserBankingProduct,
      'id' | 'createdAt' | 'updatedAt' | 'bankBankingProduct' | 'currency'
    >
  ): Promise<UserBankingProduct> {
    const userBankingProduct = await this.prisma.userBankingProduct.create({
      data: {
        userId: entity.userId,
        bankBankingProductId: entity.bankBankingProductId,
        referenceNumber: entity.referenceNumber,
        label: entity.label,
        currencyId: entity.currencyId,
      },
      include: {
        currency: true,
        bankBankingProduct: {
          include: {
            bank: true,
            bankingProduct: true,
          },
        },
      },
    });

    return this.mapToEntity(userBankingProduct);
  }

  async update(
    id: string,
    entity: Partial<
      Omit<
        UserBankingProduct,
        'id' | 'createdAt' | 'updatedAt' | 'bankBankingProduct' | 'currency'
      >
    >
  ): Promise<UserBankingProduct> {
    const updateData: any = {};

    if (entity.referenceNumber !== undefined)
      updateData.referenceNumber = entity.referenceNumber;
    if (entity.label !== undefined) updateData.label = entity.label;
    if (entity.currencyId !== undefined)
      updateData.currencyId = entity.currencyId;

    const userBankingProduct = await this.prisma.userBankingProduct.update({
      where: { id },
      data: updateData,
      include: {
        currency: true,
        bankBankingProduct: {
          include: {
            bank: true,
            bankingProduct: true,
          },
        },
      },
    });

    return this.mapToEntity(userBankingProduct);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userBankingProduct.delete({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<UserBankingProduct[]> {
    const userBankingProducts = await this.prisma.userBankingProduct.findMany({
      where: { userId },
      include: {
        currency: true,
        bankBankingProduct: {
          include: {
            bank: true,
            bankingProduct: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return userBankingProducts.map(product => this.mapToEntity(product));
  }

  private mapToEntity(prismaProduct: any): UserBankingProduct {
    const bankBankingProduct = prismaProduct.bankBankingProduct
      ? new BankBankingProduct(
          prismaProduct.bankBankingProduct.id,
          prismaProduct.bankBankingProduct.bankId,
          prismaProduct.bankBankingProduct.bankingProductId,
          prismaProduct.bankBankingProduct.bank,
          prismaProduct.bankBankingProduct.bankingProduct
        )
      : undefined;

    return new UserBankingProduct(
      prismaProduct.id,
      prismaProduct.userId,
      prismaProduct.bankBankingProductId,
      prismaProduct.referenceNumber,
      prismaProduct.label,
      prismaProduct.currencyId,
      prismaProduct.currentBalance || new Decimal(0),
      prismaProduct.lastBalanceUpdate,
      prismaProduct.createdAt,
      prismaProduct.updatedAt,
      bankBankingProduct,
      prismaProduct.currency
    );
  }

  async updateBalance(accountId: string, newBalance: Decimal): Promise<void> {
    await this.prisma.userBankingProduct.update({
      where: { id: accountId },
      data: {
        currentBalance: newBalance,
        lastBalanceUpdate: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
