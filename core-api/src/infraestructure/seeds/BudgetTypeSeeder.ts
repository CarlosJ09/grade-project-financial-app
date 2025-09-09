import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface BudgetTypeData {
  name: string;
  description: string;
}

/**
 * Seed data for budget types
 * Different types of budgets for different financial goals
 */
const budgetTypeData: BudgetTypeData[] = [
  {
    name: 'Savings',
    description: 'Accumulating money toward a specific goal or target amount',
  },
  {
    name: 'Spending Limit',
    description: 'Setting limits on recurring expenses and monthly spending',
  },
  {
    name: 'Debt Payoff',
    description: 'Allocating funds to pay down existing debts and loans',
  },
  {
    name: 'Investment',
    description: 'Funding investment accounts and long-term wealth building',
  },
];

/**
 * Seeds budget type data into the database
 * @param prisma - Prisma client instance
 */
export async function seedBudgetTypes(prisma: PrismaClient): Promise<void> {
  console.log('📊 Seeding budget types...');

  try {
    // Use upsert to handle existing budget types
    for (const budgetType of budgetTypeData) {
      await prisma.budgetType.upsert({
        where: { name: budgetType.name },
        update: { description: budgetType.description },
        create: budgetType,
      });
    }

    console.log(`✅ Successfully seeded ${budgetTypeData.length} budget types`);
  } catch (error) {
    console.error('❌ Error seeding budget types:', error);
    throw error;
  }
}

/**
 * Clears budget type data from the database
 * @param prisma - Prisma client instance
 */
export async function clearBudgetTypes(prisma: PrismaClient): Promise<void> {
  console.log('🗑️  Clearing budget types...');

  try {
    await prisma.budgetType.deleteMany({});
    console.log('✅ Successfully cleared budget types');
  } catch (error) {
    console.error('❌ Error clearing budget types:', error);
    throw error;
  }
}
