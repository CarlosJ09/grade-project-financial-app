import { BankingProduct } from "@/domain/entities/BankingProduct";
import { IBankingProductRepository } from "@/domain/repositories/IBankingProductRepository";
import { PrismaClient } from "@/infraestructure/prisma/generated/prisma";

export class PostgresBankingProductRepository implements IBankingProductRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async findAll(): Promise<BankingProduct[]> {
        const bankingProducts = await this.prisma.bankingProduct.findMany();
        return bankingProducts.map(bankingProduct => new BankingProduct(
            bankingProduct.id,
            bankingProduct.bankingProductName
        ));
    }

    async findById(id: string): Promise<BankingProduct | null> {
        const bankingProduct = await this.prisma.bankingProduct.findUnique({
            where: { id }
        });
        
        if (!bankingProduct) return null;
        
        return new BankingProduct(
            bankingProduct.id,
            bankingProduct.bankingProductName
        );
    }

    async create(entity: Omit<BankingProduct, 'id'>): Promise<BankingProduct> {
        const bankingProduct = await this.prisma.bankingProduct.create({
            data: entity
        });
        
        return new BankingProduct(
            bankingProduct.id,
            bankingProduct.bankingProductName
        );
    }

    async update(id: string, entity: Partial<Omit<BankingProduct, 'id'>>): Promise<BankingProduct> {
        const bankingProduct = await this.prisma.bankingProduct.update({
            where: { id },
            data: entity
        });
        
        return new BankingProduct(
            bankingProduct.id,
            bankingProduct.bankingProductName
        );
    }

    async delete(id: string): Promise<void> {
        await this.prisma.bankingProduct.delete({
            where: { id }
        });
    }
} 