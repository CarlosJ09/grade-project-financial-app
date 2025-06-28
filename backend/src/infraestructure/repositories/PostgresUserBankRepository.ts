import { UserBank } from '@/domain/entities/UserBank';
import { IUserBankRepository } from '@/domain/repositories/IUserBankRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresUserBankRepository implements IUserBankRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<UserBank[]> {
    const userBanks = await this.prisma.userBank.findMany();
    return userBanks.map(
      userBank =>
        new UserBank(
          userBank.id,
          userBank.userId,
          userBank.bankId,
          userBank.alias,
          userBank.lastSyncAt || undefined
        )
    );
  }

  async findById(id: string): Promise<UserBank | null> {
    const userBank = await this.prisma.userBank.findUnique({
      where: { id },
    });

    if (!userBank) return null;

    return new UserBank(
      userBank.id,
      userBank.userId,
      userBank.bankId,
      userBank.alias,
      userBank.lastSyncAt || undefined
    );
  }

  async create(
    entity: Omit<UserBank, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<UserBank> {
    const userBank = await this.prisma.userBank.create({
      data: entity,
    });

    return new UserBank(
      userBank.id,
      userBank.userId,
      userBank.bankId,
      userBank.alias,
      userBank.lastSyncAt || undefined
    );
  }

  async update(
    id: string,
    entity: Partial<Omit<UserBank, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<UserBank> {
    const userBank = await this.prisma.userBank.update({
      where: { id },
      data: entity,
    });

    return new UserBank(
      userBank.id,
      userBank.userId,
      userBank.bankId,
      userBank.alias,
      userBank.lastSyncAt || undefined
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.userBank.delete({
      where: { id },
    });
  }
}
