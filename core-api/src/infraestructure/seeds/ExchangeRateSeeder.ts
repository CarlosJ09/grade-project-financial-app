import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface ExchangeRateData {
  currencyCode: string; // We'll resolve this to currencyId during seeding
  rate: number;
  rateDate: Date;
}

/**
 * Seed data for exchange rates
 * Sample exchange rates for different currencies against base currency (assumed to be DOP)
 */
const exchangeRateData: ExchangeRateData[] = [
  // Current approximate rates (these should be updated regularly in a real application)
  { currencyCode: 'USD', rate: 0.017, rateDate: new Date('2024-01-01') }, // 1 DOP = ~0.017 USD
  { currencyCode: 'EUR', rate: 0.015, rateDate: new Date('2024-01-01') }, // 1 DOP = ~0.015 EUR

  // Historical rates for USD
  { currencyCode: 'USD', rate: 0.018, rateDate: new Date('2023-12-01') },
  { currencyCode: 'USD', rate: 0.017, rateDate: new Date('2023-11-01') },
  { currencyCode: 'USD', rate: 0.016, rateDate: new Date('2023-10-01') },

  // Historical rates for EUR
  { currencyCode: 'EUR', rate: 0.016, rateDate: new Date('2023-12-01') },
  { currencyCode: 'EUR', rate: 0.015, rateDate: new Date('2023-11-01') },
  { currencyCode: 'EUR', rate: 0.014, rateDate: new Date('2023-10-01') },

  // More recent rates
  { currencyCode: 'USD', rate: 0.017, rateDate: new Date('2024-02-01') },
  { currencyCode: 'USD', rate: 0.017, rateDate: new Date('2024-03-01') },
  { currencyCode: 'EUR', rate: 0.015, rateDate: new Date('2024-02-01') },
  { currencyCode: 'EUR', rate: 0.016, rateDate: new Date('2024-03-01') },
];

/**
 * Seeds exchange rate data into the database
 * @param prisma - Prisma client instance
 */
export async function seedExchangeRates(prisma: PrismaClient): Promise<void> {
  console.log('💱 Seeding exchange rates...');

  try {
    // First, get all currencies to resolve currencyId
    const currencies = await prisma.currency.findMany();
    const currencyMap = new Map(currencies.map(curr => [curr.code, curr.id]));

    let seedCount = 0;

    // Create exchange rates
    for (const exchangeRate of exchangeRateData) {
      const currencyId = currencyMap.get(exchangeRate.currencyCode);

      if (!currencyId) {
        console.warn(
          `⚠️ Currency '${exchangeRate.currencyCode}' not found for exchange rate. Skipping...`
        );
        continue;
      }

      // Check if exchange rate already exists for this currency and date
      const existingRate = await prisma.exchangeRate.findFirst({
        where: {
          currencyId,
          rateDate: exchangeRate.rateDate,
        },
      });

      if (!existingRate) {
        await prisma.exchangeRate.create({
          data: {
            currencyId,
            rate: exchangeRate.rate,
            rateDate: exchangeRate.rateDate,
          },
        });
        seedCount++;
      }
    }

    console.log(`✅ Successfully seeded ${seedCount} exchange rates`);

    // Log rates by currency
    const usdRates = exchangeRateData.filter(
      r => r.currencyCode === 'USD'
    ).length;
    const eurRates = exchangeRateData.filter(
      r => r.currencyCode === 'EUR'
    ).length;

    console.log(`   - ${usdRates} USD rates`);
    console.log(`   - ${eurRates} EUR rates`);
  } catch (error) {
    console.error('❌ Failed to seed exchange rates:', error);
    throw error;
  }
}
