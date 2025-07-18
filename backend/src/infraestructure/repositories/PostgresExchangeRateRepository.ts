import { ExchangeRate } from '@/domain/entities/ExchangeRate';
import { IExchangeRateRepository } from '@/domain/repositories/IExchangeRateRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresExchangeRateRepository implements IExchangeRateRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<ExchangeRate[]> {
    const exchangeRates = await this.prisma.exchangeRate.findMany();
    return exchangeRates.map(
      exchangeRate =>
        new ExchangeRate(
          exchangeRate.id.toString(),
          exchangeRate.currencyId.toString(),
          exchangeRate.rate.toNumber(),
          exchangeRate.rateDate
        )
    );
  }

  async findById(id: string): Promise<ExchangeRate | null> {
    const exchangeRate = await this.prisma.exchangeRate.findUnique({
      where: { id: parseInt(id) },
    });

    if (!exchangeRate) return null;

    return new ExchangeRate(
      exchangeRate.id.toString(),
      exchangeRate.currencyId.toString(),
      exchangeRate.rate.toNumber(),
      exchangeRate.rateDate
    );
  }

  async findLatestRate(
    fromCurrency: string,
    toCurrency: string
  ): Promise<ExchangeRate | null> {
    // Get currency IDs first
    const [fromCurrencyRecord, toCurrencyRecord] = await Promise.all([
      this.prisma.currency.findFirst({ where: { currency: fromCurrency } }),
      this.prisma.currency.findFirst({ where: { currency: toCurrency } }),
    ]);

    if (!fromCurrencyRecord || !toCurrencyRecord) return null;

    // For now, we'll find the latest rate for the from currency
    // In a real implementation, you might need more sophisticated logic
    const exchangeRate = await this.prisma.exchangeRate.findFirst({
      where: {
        currencyId: fromCurrencyRecord.id,
      },
      orderBy: {
        rateDate: 'desc',
      },
    });

    if (!exchangeRate) return null;

    return new ExchangeRate(
      exchangeRate.id.toString(),
      exchangeRate.currencyId.toString(),
      exchangeRate.rate.toNumber(),
      exchangeRate.rateDate
    );
  }

  async create(entity: Omit<ExchangeRate, 'id'>): Promise<ExchangeRate> {
    const exchangeRate = await this.prisma.exchangeRate.create({
      data: {
        currencyId: parseInt(entity.currencyId),
        rate: entity.rate,
        rateDate: entity.rateDate,
      },
    });

    return new ExchangeRate(
      exchangeRate.id.toString(),
      exchangeRate.currencyId.toString(),
      exchangeRate.rate.toNumber(),
      exchangeRate.rateDate
    );
  }

  async update(
    id: string,
    entity: Partial<Omit<ExchangeRate, 'id'>>
  ): Promise<ExchangeRate> {
    const updateData: any = {};

    if (entity.currencyId !== undefined) {
      updateData.currencyId = parseInt(entity.currencyId);
    }
    if (entity.rate !== undefined) {
      updateData.rate = entity.rate;
    }
    if (entity.rateDate !== undefined) {
      updateData.rateDate = entity.rateDate;
    }

    const exchangeRate = await this.prisma.exchangeRate.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return new ExchangeRate(
      exchangeRate.id.toString(),
      exchangeRate.currencyId.toString(),
      exchangeRate.rate.toNumber(),
      exchangeRate.rateDate
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.exchangeRate.delete({
      where: { id: parseInt(id) },
    });
  }
}
