import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface CurrencyData {
  currency: string;
}

/**
 * Seed data for currencies
 * Using ISO 4217 currency codes
 */
const currencyData: CurrencyData[] = [
  { currency: 'DOP' }, // Dominican Peso
  { currency: 'USD' }, // US Dollar
  { currency: 'EUR' }, // Euro
];

/**
 * Seeds currency data into the database
 * @param prisma - Prisma client instance
 */
export async function seedCurrencies(prisma: PrismaClient): Promise<void> {
  console.log('📦 Seeding currencies...');

  try {
    // Check existing currencies and only create new ones
    for (const currency of currencyData) {
      const existingCurrency = await prisma.currency.findFirst({
        where: { currency: currency.currency },
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
