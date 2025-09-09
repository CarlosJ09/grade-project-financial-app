import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface TransactionTypeData {
  name: string;
}

/**
 * Seed data for transaction types
 * Basic transaction types for financial operations
 */
const transactionTypeData: TransactionTypeData[] = [
  { name: 'Income' },
  { name: 'Expense' },
];

/**
 * Seeds transaction type data into the database
 * @param prisma - Prisma client instance
 */
export async function seedTransactionTypes(
  prisma: PrismaClient
): Promise<void> {
  console.log('🔄 Seeding transaction types...');

  try {
    // Use upsert to handle existing transaction types
    for (const transactionType of transactionTypeData) {
      await prisma.transactionType.upsert({
        where: { name: transactionType.name },
        update: {},
        create: transactionType,
      });
    }

    console.log(
      `✅ Successfully seeded ${transactionTypeData.length} transaction types`
    );
  } catch (error) {
    console.error('❌ Failed to seed transaction types:', error);
    throw error;
  }
}
