import { Bank } from "@/domain/entities/Bank";
import { BankRepository } from "@/domain/interfaces/BankRepository";
import { PrismaClient } from "@/infraestructure/prisma/generated/prisma";

export class PostgresBankRepository implements BankRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async findAll(): Promise<Bank[]> {
        return this.prisma.bank.findMany();
    }

    async findById(id: string): Promise<Bank | null> {
        return this.prisma.bank.findUnique({
            where: { id }
        });
    }

    async create(bank: Bank): Promise<Bank> {
        return this.prisma.bank.create({
            data: bank
        });
    }

    async update(bank: Bank): Promise<Bank> {
        return this.prisma.bank.update({
            where: { id: bank.id },
            data: bank
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.bank.delete({
            where: { id }
        });
    }
}