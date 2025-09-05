import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface PaymentMethodData {
  paymentMethod: string;
}

/**
 * Seed data for payment methods
 * Common payment methods used in financial applications
 */
const paymentMethodData: PaymentMethodData[] = [
  { paymentMethod: 'cash' },
  { paymentMethod: 'credit_card' },
  { paymentMethod: 'debit_card' },
  { paymentMethod: 'bank_transfer' },
  { paymentMethod: 'digital_wallet' },
  { paymentMethod: 'paypal' },
  { paymentMethod: 'apple_pay' },
  { paymentMethod: 'google_pay' },
  { paymentMethod: 'check' },
  { paymentMethod: 'money_order' },
  { paymentMethod: 'cryptocurrency' },
  { paymentMethod: 'gift_card' },
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
        where: { paymentMethod: paymentMethod.paymentMethod },
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
