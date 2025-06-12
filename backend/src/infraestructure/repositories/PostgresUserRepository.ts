import { User } from "@/domain/entities/User";
import { IUserRepository } from "@/domain/interfaces/IUserRepository";
import { PrismaClient } from "@/infraestructure/prisma/generated/prisma";

export class PostgresUserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id }
        });
    }

    async create(entity: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        return this.prisma.user.create({
            data: entity
        });
    }

    async update(id: string, entity: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data: entity
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id }
        });
    }
}
