import { Database } from '@/infraestructure/config/Database';
import { seedBanks } from '@/infraestructure/seeds/BankSeeder';
import { seedBankingProducts } from '@/infraestructure/seeds/BankingProductSeeder';
import { seedBudgetStatuses } from '@/infraestructure/seeds/BudgetStatusSeeder';
import { seedCategories } from '@/infraestructure/seeds/CategorySeeder';
import { seedCurrencies } from '@/infraestructure/seeds/CurrencySeeder';
import { seedPaymentMethods } from '@/infraestructure/seeds/PaymentMethodSeeder';

/**
 * Main seeding function that orchestrates all seed operations
 */
export async function seedDatabase(): Promise<void> {
  const prisma = Database.getInstance();

  try {
    console.log('🌱 Starting database seeding...');

    // Seed in order of dependencies
    await seedCurrencies(prisma);
    await seedPaymentMethods(prisma);
    await seedCategories(prisma);
    await seedBanks(prisma);
    await seedBankingProducts(prisma);
    await seedBudgetStatuses(prisma);

    console.log('✅ Database seeding completed successfully');
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  }
}

/**
 * Clear all seeded data (useful for testing or resetting)
 */
export async function clearSeedData(): Promise<void> {
  const prisma = Database.getInstance();

  try {
    console.log('🧹 Clearing seed data...');

    // Clear in reverse order of dependencies
    await prisma.bankingProduct.deleteMany({});
    await prisma.bank.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.paymentMethod.deleteMany({});
    await prisma.currency.deleteMany({});

    console.log('✅ Seed data cleared successfully');
  } catch (error) {
    console.error('❌ Failed to clear seed data:', error);
    throw error;
  }
}

/**
 * Main execution function
 */
async function main() {
  try {
    console.log('🚀 Initializing seeding process...');

    const command = process.argv[2] || 'seed';
    console.log(`📋 Command: ${command}`);

    // Connect to database
    console.log('🔌 Connecting to database...');
    await Database.connect();
    console.log('✅ Database connected');

    // Execute command
    switch (command) {
      case 'clear':
        await clearSeedData();
        break;
      case 'seed':
      default:
        await seedDatabase();
        break;
    }
  } catch (error) {
    console.error('❌ Seeding operation failed:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  } finally {
    try {
      console.log('🔌 Disconnecting from database...');
      await Database.disconnect();
      console.log('✅ Database disconnected');
    } catch (error) {
      console.error('❌ Error disconnecting from database:', error);
    }
    process.exit(0);
  }
}

// Run the main function
main().catch(error => {
  console.error('❌ Unhandled error in main:', error);
  process.exit(1);
});
