import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface CategoryData {
  name: string;
  type: 'expense' | 'income' | 'budget';
}

/**
 * Seed data for categories
 * Organized by type: expense, income, and budget categories
 */
const categoryData: CategoryData[] = [
  // Expense Categories
  { name: 'Food & Dining', type: 'expense' },
  { name: 'Groceries', type: 'expense' },
  { name: 'Transportation', type: 'expense' },
  { name: 'Gas & Fuel', type: 'expense' },
  { name: 'Housing', type: 'expense' },
  { name: 'Utilities', type: 'expense' },
  { name: 'Phone & Internet', type: 'expense' },
  { name: 'Entertainment', type: 'expense' },
  { name: 'Shopping', type: 'expense' },
  { name: 'Clothing', type: 'expense' },
  { name: 'Healthcare', type: 'expense' },
  { name: 'Insurance', type: 'expense' },
  { name: 'Education', type: 'expense' },
  { name: 'Travel', type: 'expense' },
  { name: 'Subscriptions', type: 'expense' },
  { name: 'Gym & Fitness', type: 'expense' },
  { name: 'Personal Care', type: 'expense' },
  { name: 'Pets', type: 'expense' },
  { name: 'Gifts & Donations', type: 'expense' },
  { name: 'Taxes', type: 'expense' },
  { name: 'Banking Fees', type: 'expense' },
  { name: 'Miscellaneous', type: 'expense' },

  // Income Categories
  { name: 'Salary', type: 'income' },
  { name: 'Freelance', type: 'income' },
  { name: 'Business Income', type: 'income' },
  { name: 'Investment Returns', type: 'income' },
  { name: 'Dividends', type: 'income' },
  { name: 'Interest', type: 'income' },
  { name: 'Rental Income', type: 'income' },
  { name: 'Bonus', type: 'income' },
  { name: 'Tax Refund', type: 'income' },
  { name: 'Gift Received', type: 'income' },
  { name: 'Side Hustle', type: 'income' },
  { name: 'Pension', type: 'income' },
  { name: 'Other Income', type: 'income' },

  // Budget Categories
  { name: 'Monthly Budget', type: 'budget' },
  { name: 'Emergency Fund', type: 'budget' },
  { name: 'Vacation Fund', type: 'budget' },
  { name: 'Home Down Payment', type: 'budget' },
  { name: 'Car Purchase', type: 'budget' },
  { name: 'Debt Payoff', type: 'budget' },
  { name: 'Investment Fund', type: 'budget' },
  { name: 'Education Fund', type: 'budget' },
  { name: 'Wedding Fund', type: 'budget' },
  { name: 'Holiday Fund', type: 'budget' },
  { name: 'Retirement Fund', type: 'budget' },
  { name: 'Medical Fund', type: 'budget' },
];

/**
 * Seeds category data into the database
 * @param prisma - Prisma client instance
 */
export async function seedCategories(prisma: PrismaClient): Promise<void> {
  console.log('📁 Seeding categories...');

  try {
    // Use upsert to handle existing categories
    for (const category of categoryData) {
      await prisma.category.upsert({
        where: { name: category.name },
        update: { type: category.type },
        create: category,
      });
    }

    console.log(`✅ Successfully seeded ${categoryData.length} categories`);

    // Log category counts by type
    const expenseCount = categoryData.filter(c => c.type === 'expense').length;
    const incomeCount = categoryData.filter(c => c.type === 'income').length;
    const budgetCount = categoryData.filter(c => c.type === 'budget').length;

    console.log(`   - ${expenseCount} expense categories`);
    console.log(`   - ${incomeCount} income categories`);
    console.log(`   - ${budgetCount} budget categories`);
  } catch (error) {
    console.error('❌ Failed to seed categories:', error);
    throw error;
  }
}
