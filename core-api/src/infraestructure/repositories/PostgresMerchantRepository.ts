import { Merchant } from '@/domain/entities/Merchant';
import { IMerchantRepository } from '@/domain/repositories/IMerchantRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresMerchantRepository implements IMerchantRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Merchant[]> {
    const merchants = await this.prisma.merchant.findMany();
    return merchants.map(
      merchant =>
        new Merchant(
          merchant.id,
          merchant.name,
          merchant.categoryId,
          merchant.createdAt,
          merchant.updatedAt,
          merchant.website || undefined,
          merchant.location || undefined
        )
    );
  }

  async findById(id: number): Promise<Merchant | null> {
    const merchant = await this.prisma.merchant.findUnique({
      where: { id },
    });

    if (!merchant) return null;

    return new Merchant(
      merchant.id,
      merchant.name,
      merchant.categoryId,
      merchant.createdAt,
      merchant.updatedAt,
      merchant.website || undefined,
      merchant.location || undefined
    );
  }
}
