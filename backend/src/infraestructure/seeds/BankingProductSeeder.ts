import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface BankingProductData {
  bankingProductName: string;
}

/**
 * Seed data for banking products
 * Common banking products offered by financial institutions
 */
const bankingProductData: BankingProductData[] = [
  { bankingProductName: 'checking_account' },
  { bankingProductName: 'savings_account' },
  { bankingProductName: 'money_market_account' },
  { bankingProductName: 'certificate_of_deposit' },
  { bankingProductName: 'individual_retirement_account' },
  { bankingProductName: 'credit_card' },
  { bankingProductName: 'debit_card' },
  { bankingProductName: 'personal_loan' },
  { bankingProductName: 'auto_loan' },
  { bankingProductName: 'mortgage' },
  { bankingProductName: 'home_equity_loan' },
  { bankingProductName: 'home_equity_line_of_credit' },
  { bankingProductName: 'business_checking' },
  { bankingProductName: 'business_savings' },
  { bankingProductName: 'business_loan' },
  { bankingProductName: 'business_credit_card' },
  { bankingProductName: 'student_loan' },
  { bankingProductName: 'investment_account' },
  { bankingProductName: 'brokerage_account' },
  { bankingProductName: 'trust_account' },
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
        where: { bankingProductName: bankingProduct.bankingProductName },
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
