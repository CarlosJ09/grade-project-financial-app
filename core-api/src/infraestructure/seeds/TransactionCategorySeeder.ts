import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface TransactionCategoryData {
  name: string;
}

/**
 * Seed data for transaction categories
 * Categories for different types of transactions
 */
const transactionCategoryData: TransactionCategoryData[] = [
  // Expense Categories
  { name: 'Food & Dining' },
  { name: 'Groceries' },
  { name: 'Transportation' },
  { name: 'Gas & Fuel' },
  { name: 'Housing' },
  { name: 'Utilities' },
  { name: 'Phone & Internet' },
  { name: 'Entertainment' },
  { name: 'Shopping' },
  { name: 'Clothing' },
  { name: 'Healthcare' },
  { name: 'Insurance' },
  { name: 'Education' },
  { name: 'Travel' },
  { name: 'Subscriptions' },
  { name: 'Gym & Fitness' },
  { name: 'Personal Care' },
  { name: 'Pets' },
  { name: 'Gifts & Donations' },
  { name: 'Taxes' },
  { name: 'Banking Fees' },
  { name: 'Miscellaneous' },

  // Income Categories
  { name: 'Salary' },
  { name: 'Freelance' },
  { name: 'Business Income' },
  { name: 'Investment Returns' },
  { name: 'Dividends' },
  { name: 'Interest' },
  { name: 'Rental Income' },
  { name: 'Bonus' },
  { name: 'Tax Refund' },
  { name: 'Gift Received' },
  { name: 'Side Hustle' },
  { name: 'Pension' },
  { name: 'Other Income' },
];

/**
 * Seeds transaction category data into the database
 * @param prisma - Prisma client instance
 */
export async function seedTransactionCategories(
  prisma: PrismaClient
): Promise<void> {
  console.log('📁 Seeding transaction categories...');

  try {
    // Use upsert to handle existing categories
    for (const category of transactionCategoryData) {
      await prisma.transactionCategory.upsert({
        where: { name: category.name },
        update: {},
        create: category,
      });
    }

    console.log(
      `✅ Successfully seeded ${transactionCategoryData.length} transaction categories`
    );
  } catch (error) {
    console.error('❌ Failed to seed transaction categories:', error);
    throw error;
  }
}
