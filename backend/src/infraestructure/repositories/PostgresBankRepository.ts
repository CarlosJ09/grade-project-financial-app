import { Bank } from '@/domain/entities/Bank';
import { IBankRepository } from '@/domain/repositories/IBankRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresBankRepository implements IBankRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Bank[]> {
    return this.prisma.bank.findMany();
  }

  async findById(id: string): Promise<Bank | null> {
    return this.prisma.bank.findUnique({
      where: { id },
    });
  }

  async create(
    entity: Omit<Bank, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Bank> {
    return this.prisma.bank.create({
      data: entity,
    });
  }

  async update(
    id: string,
    entity: Partial<Omit<Bank, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Bank> {
    return this.prisma.bank.update({
      where: { id },
      data: entity,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.bank.delete({
      where: { id },
    });
  }
}
