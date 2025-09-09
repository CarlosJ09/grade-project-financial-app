import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface BankingProductData {
  name: string;
}

/**
 * Seed data for banking products
 * Common banking products offered by financial institutions
 */
const bankingProductData: BankingProductData[] = [
  { name: 'Checking Account' },
  { name: 'Savings Account' },
  { name: 'Money Market Account' },
  { name: 'Certificate of Deposit' },
  { name: 'Individual Retirement Account' },
  { name: 'Credit Card' },
  { name: 'Debit Card' },
  { name: 'Personal Loan' },
  { name: 'Auto Loan' },
  { name: 'Mortgage' },
  { name: 'Home Equity Loan' },
  { name: 'Home Equity Line of Credit' },
  { name: 'Business Checking' },
  { name: 'Business Savings' },
  { name: 'Business Loan' },
  { name: 'Business Credit Card' },
  { name: 'Student Loan' },
  { name: 'Investment Account' },
  { name: 'Brokerage Account' },
  { name: 'Trust Account' },
];

/**
 * Seeds banking product data into the database
 * @param prisma - Prisma client instance
 */
export async function seedBankingProducts(prisma: PrismaClient): Promise<void> {
  console.log('🏪 Seeding banking products...');

  try {
    // Check existing banking products and only create new ones
    for (const bankingProduct of bankingProductData) {
      const existingBankingProduct = await prisma.bankingProduct.findFirst({
        where: { name: bankingProduct.name },
      });

      if (!existingBankingProduct) {
        await prisma.bankingProduct.create({
          data: bankingProduct,
        });
      }
    }

    console.log(
      `✅ Successfully seeded ${bankingProductData.length} banking products`
    );
  } catch (error) {
    console.error('❌ Failed to seed banking products:', error);
    throw error;
  }
}
