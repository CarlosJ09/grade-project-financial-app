import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface BudgetCategoryData {
  name: string;
  defaultBudgetType: string; // Default budget type for this category
}

/**
 * Seed data for budget categories
 * Categories for different types of budgets
 */
const budgetCategoryData: BudgetCategoryData[] = [
  // Spending Limits - Monthly recurring expenses
  { name: 'Monthly Living', defaultBudgetType: 'Spending Limit' },
  { name: 'Housing', defaultBudgetType: 'Spending Limit' },
  { name: 'Food & Groceries', defaultBudgetType: 'Spending Limit' },
  { name: 'Transportation', defaultBudgetType: 'Spending Limit' },
  { name: 'Utilities', defaultBudgetType: 'Spending Limit' },
  { name: 'Healthcare', defaultBudgetType: 'Spending Limit' },
  { name: 'Insurance', defaultBudgetType: 'Spending Limit' },
  { name: 'Entertainment', defaultBudgetType: 'Spending Limit' },
  { name: 'Hobbies', defaultBudgetType: 'Spending Limit' },
  { name: 'Sports & Fitness', defaultBudgetType: 'Spending Limit' },
  { name: 'Subscriptions', defaultBudgetType: 'Spending Limit' },
  { name: 'Dining Out', defaultBudgetType: 'Spending Limit' },
  { name: 'Family Activities', defaultBudgetType: 'Spending Limit' },
  { name: 'Gifts & Celebrations', defaultBudgetType: 'Spending Limit' },
  { name: 'Childcare', defaultBudgetType: 'Spending Limit' },
  { name: 'Pet Care', defaultBudgetType: 'Spending Limit' },

  // Savings Goals - Accumulating toward targets
  { name: 'Emergency Fund', defaultBudgetType: 'Savings' },
  { name: 'Vacation Fund', defaultBudgetType: 'Savings' },
  { name: 'Home Down Payment', defaultBudgetType: 'Savings' },
  { name: 'Car Purchase', defaultBudgetType: 'Savings' },
  { name: 'Wedding Fund', defaultBudgetType: 'Savings' },
  { name: 'Holiday Fund', defaultBudgetType: 'Savings' },
  { name: 'Home Improvement', defaultBudgetType: 'Savings' },
  { name: 'Technology Upgrade', defaultBudgetType: 'Savings' },
  { name: 'Education Fund', defaultBudgetType: 'Savings' },
  { name: 'Child Education', defaultBudgetType: 'Savings' },
  { name: 'Professional Development', defaultBudgetType: 'Savings' },
  { name: 'Skills Training', defaultBudgetType: 'Savings' },
  { name: 'Certification', defaultBudgetType: 'Savings' },
  { name: 'Language Learning', defaultBudgetType: 'Savings' },
  { name: 'General Savings', defaultBudgetType: 'Savings' },

  // Investment Goals
  { name: 'Retirement', defaultBudgetType: 'Investment' },
  { name: 'Investment Fund', defaultBudgetType: 'Investment' },
  { name: 'Business Investment', defaultBudgetType: 'Investment' },
  { name: 'Side Hustle Fund', defaultBudgetType: 'Investment' },
  { name: 'Equipment Purchase', defaultBudgetType: 'Investment' },

  // Debt Payoff
  { name: 'Debt Payoff', defaultBudgetType: 'Debt Payoff' },
  { name: 'Credit Card Payoff', defaultBudgetType: 'Debt Payoff' },
  { name: 'Student Loan', defaultBudgetType: 'Debt Payoff' },
  { name: 'Mortgage Extra', defaultBudgetType: 'Debt Payoff' },

  // Special Categories
  { name: 'Miscellaneous', defaultBudgetType: 'Spending Limit' },
  { name: 'Unexpected Expenses', defaultBudgetType: 'Spending Limit' },
];

/**
 * Seeds budget category data into the database
 * @param prisma - Prisma client instance
 */
export async function seedBudgetCategories(
  prisma: PrismaClient
): Promise<void> {
  console.log('💰 Seeding budget categories...');

  try {
    // Get budget type IDs for mapping
    const budgetTypes = await prisma.budgetType.findMany();
    const budgetTypeMap = new Map(
      budgetTypes.map(type => [type.name, type.id])
    );

    // Use upsert to handle existing budget categories
    for (const category of budgetCategoryData) {
      const budgetTypeId = budgetTypeMap.get(category.defaultBudgetType);
      if (!budgetTypeId) {
        throw new Error(
          `Budget type '${category.defaultBudgetType}' not found. Make sure to seed budget types first.`
        );
      }

      await prisma.budgetCategory.upsert({
        where: { name: category.name },
        update: { budgetTypeId },
        create: {
          name: category.name,
          budgetTypeId,
        },
      });
    }

    console.log(
      `✅ Successfully seeded ${budgetCategoryData.length} budget categories`
    );

    // Log category counts by type
    const essentialCount = budgetCategoryData.slice(0, 7).length;
    const savingsCount = budgetCategoryData.slice(7, 12).length;
    const goalCount = budgetCategoryData.slice(12, 19).length;

    console.log(`   - ${essentialCount} essential categories`);
    console.log(`   - ${savingsCount} savings categories`);
    console.log(`   - ${goalCount} goal-based categories`);
    console.log(
      `   - ${budgetCategoryData.length - essentialCount - savingsCount - goalCount} other categories`
    );
  } catch (error) {
    console.error('❌ Failed to seed budget categories:', error);
    throw error;
  }
}
