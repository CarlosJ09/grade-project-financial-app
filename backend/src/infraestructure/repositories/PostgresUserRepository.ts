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
}
