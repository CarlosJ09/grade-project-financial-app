import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface PaymentMethodData {
  name: string;
}

/**
 * Seed data for payment methods
 * Common payment methods used in financial applications
 */
const paymentMethodData: PaymentMethodData[] = [
  { name: 'Cash' },
  { name: 'Credit Card' },
  { name: 'Debit Card' },
  { name: 'Bank Transfer' },
  { name: 'Digital Wallet' },
  { name: 'Paypal' },
  { name: 'Check' },
  { name: 'Cryptocurrency' },
];

/**
 * Seeds payment method data into the database
 * @param prisma - Prisma client instance
 */
export async function seedPaymentMethods(prisma: PrismaClient): Promise<void> {
  console.log('💳 Seeding payment methods...');

  try {
    // Check existing payment methods and only create new ones
    for (const paymentMethod of paymentMethodData) {
      const existingPaymentMethod = await prisma.paymentMethod.findFirst({
        where: { name: paymentMethod.name },
      });

      if (!existingPaymentMethod) {
        await prisma.paymentMethod.create({
          data: paymentMethod,
        });
      }
    }

    console.log(
      `✅ Successfully seeded ${paymentMethodData.length} payment methods`
    );
  } catch (error) {
    console.error('❌ Failed to seed payment methods:', error);
    throw error;
  }
}
