import { ExchangeRate } from "@/domain/entities/ExchangeRate";
import { IExchangeRateRepository } from "@/domain/repositories/IExchangeRateRepository";
import { PrismaClient } from "@/infraestructure/prisma/generated/prisma";

export class PostgresExchangeRateRepository implements IExchangeRateRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async findAll(): Promise<ExchangeRate[]> {
        const exchangeRates = await this.prisma.exchangeRate.findMany();
        return exchangeRates.map(exchangeRate => new ExchangeRate(
            exchangeRate.id,
            exchangeRate.currencyId,
            exchangeRate.rate.toNumber(),
            exchangeRate.rateDate
        ));
    }

    async findById(id: string): Promise<ExchangeRate | null> {
        const exchangeRate = await this.prisma.exchangeRate.findUnique({
            where: { id }
        });
        
        if (!exchangeRate) return null;
        
        return new ExchangeRate(
            exchangeRate.id,
            exchangeRate.currencyId,
            exchangeRate.rate.toNumber(),
            exchangeRate.rateDate
        );
    }

    async create(entity: Omit<ExchangeRate, 'id'>): Promise<ExchangeRate> {
        const exchangeRate = await this.prisma.exchangeRate.create({
            data: entity
        });
        
        return new ExchangeRate(
            exchangeRate.id,
            exchangeRate.currencyId,
            exchangeRate.rate.toNumber(),
            exchangeRate.rateDate
        );
    }

    async update(id: string, entity: Partial<Omit<ExchangeRate, 'id'>>): Promise<ExchangeRate> {
        const exchangeRate = await this.prisma.exchangeRate.update({
            where: { id },
            data: entity
        });
        
        return new ExchangeRate(
            exchangeRate.id,
            exchangeRate.currencyId,
            exchangeRate.rate.toNumber(),
            exchangeRate.rateDate
        );
    }

    async delete(id: string): Promise<void> {
        await this.prisma.exchangeRate.delete({
            where: { id }
        });
    }
} 