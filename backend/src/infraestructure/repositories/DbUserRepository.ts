import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/interfaces/UserRepository";
import { PrismaClient } from "@/infraestructure/generated/prisma";

export class DbUserRepository implements UserRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id }
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

    async create(user: User): Promise<User> {
        return this.prisma.user.create({
            data: user
        });
    }

    async update(user: User): Promise<User> {
        return this.prisma.user.update({
            where: { id: user.id },
            data: user
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id }
        });
    }
}
