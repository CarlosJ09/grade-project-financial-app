import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface CategoryData {
  name: string;
  kind: 'expense' | 'income' | 'budget';
}

/**
 * Seed data for categories
 * Organized by kind: expense, income, and budget categories
 */
const categoryData: CategoryData[] = [
  // Expense Categories
  { name: 'Food & Dining', kind: 'expense' },
  { name: 'Groceries', kind: 'expense' },
  { name: 'Transportation', kind: 'expense' },
  { name: 'Gas & Fuel', kind: 'expense' },
  { name: 'Housing', kind: 'expense' },
  { name: 'Utilities', kind: 'expense' },
  { name: 'Phone & Internet', kind: 'expense' },
  { name: 'Entertainment', kind: 'expense' },
  { name: 'Shopping', kind: 'expense' },
  { name: 'Clothing', kind: 'expense' },
  { name: 'Healthcare', kind: 'expense' },
  { name: 'Insurance', kind: 'expense' },
  { name: 'Education', kind: 'expense' },
  { name: 'Travel', kind: 'expense' },
  { name: 'Subscriptions', kind: 'expense' },
  { name: 'Gym & Fitness', kind: 'expense' },
  { name: 'Personal Care', kind: 'expense' },
  { name: 'Pets', kind: 'expense' },
  { name: 'Gifts & Donations', kind: 'expense' },
  { name: 'Taxes', kind: 'expense' },
  { name: 'Banking Fees', kind: 'expense' },
  { name: 'Miscellaneous', kind: 'expense' },

  // Income Categories
  { name: 'Salary', kind: 'income' },
  { name: 'Freelance', kind: 'income' },
  { name: 'Business Income', kind: 'income' },
  { name: 'Investment Returns', kind: 'income' },
  { name: 'Dividends', kind: 'income' },
  { name: 'Interest', kind: 'income' },
  { name: 'Rental Income', kind: 'income' },
  { name: 'Bonus', kind: 'income' },
  { name: 'Tax Refund', kind: 'income' },
  { name: 'Gift Received', kind: 'income' },
  { name: 'Side Hustle', kind: 'income' },
  { name: 'Pension', kind: 'income' },
  { name: 'Other Income', kind: 'income' },

  // Budget Categories
  { name: 'Monthly Budget', kind: 'budget' },
  { name: 'Emergency Fund', kind: 'budget' },
  { name: 'Vacation Fund', kind: 'budget' },
  { name: 'Home Down Payment', kind: 'budget' },
  { name: 'Car Purchase', kind: 'budget' },
  { name: 'Debt Payoff', kind: 'budget' },
  { name: 'Investment Fund', kind: 'budget' },
  { name: 'Education Fund', kind: 'budget' },
  { name: 'Wedding Fund', kind: 'budget' },
  { name: 'Holiday Fund', kind: 'budget' },
  { name: 'Retirement Fund', kind: 'budget' },
  { name: 'Medical Fund', kind: 'budget' },
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
        update: { kind: category.kind },
        create: category,
      });
    }

    console.log(`✅ Successfully seeded ${categoryData.length} categories`);

    // Log category counts by kind
    const expenseCount = categoryData.filter(c => c.kind === 'expense').length;
    const incomeCount = categoryData.filter(c => c.kind === 'income').length;
    const budgetCount = categoryData.filter(c => c.kind === 'budget').length;

    console.log(`   - ${expenseCount} expense categories`);
    console.log(`   - ${incomeCount} income categories`);
    console.log(`   - ${budgetCount} budget categories`);
  } catch (error) {
    console.error('❌ Failed to seed categories:', error);
    throw error;
  }
}
