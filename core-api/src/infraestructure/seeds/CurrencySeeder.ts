import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface CurrencyData {
  code: string;
  name: string;
  symbol: string;
}

/**
 * Seed data for currencies
 * Using ISO 4217 currency codes with names and symbols
 */
const currencyData: CurrencyData[] = [
  { code: 'DOP', name: 'Dominican Peso', symbol: 'RD$' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
];

/**
 * Seeds currency data into the database
 * @param prisma - Prisma client instance
 */
export async function seedCurrencies(prisma: PrismaClient): Promise<void> {
  console.log('💱 Seeding currencies...');

  try {
    // Check existing currencies and only create new ones
    for (const currency of currencyData) {
      const existingCurrency = await prisma.currency.findFirst({
        where: { code: currency.code },
      });

      if (!existingCurrency) {
        await prisma.currency.create({
          data: currency,
        });
      }
    }

    console.log(`✅ Successfully seeded ${currencyData.length} currencies`);
  } catch (error) {
    console.error('❌ Failed to seed currencies:', error);
    throw error;
  }
}
