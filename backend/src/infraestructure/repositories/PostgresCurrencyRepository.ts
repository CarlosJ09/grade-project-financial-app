import { Currency } from '@/domain/entities/Currency';
import { ICurrencyRepository } from '@/domain/repositories/ICurrencyRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresCurrencyRepository implements ICurrencyRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Currency[]> {
    const currencies = await this.prisma.currency.findMany({
      orderBy: {
        currency: 'asc',
      },
    });
    return currencies.map(
      currency => new Currency(currency.id.toString(), currency.currency)
    );
  }

  async findById(id: string): Promise<Currency | null> {
    const currency = await this.prisma.currency.findUnique({
      where: { id: parseInt(id) },
    });

    if (!currency) return null;

    return new Currency(currency.id.toString(), currency.currency);
  }

  async findByIdInt(id: number): Promise<Currency | null> {
    const currency = await this.prisma.currency.findUnique({
      where: { id },
    });

    if (!currency) return null;

    return new Currency(currency.id.toString(), currency.currency);
  }
}
