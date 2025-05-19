import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/interfaces/UserRepository";
import { PrismaClient } from "@/infraestructure/prisma/generated/prisma";

export class PostgresUserRepository implements UserRepository {
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
