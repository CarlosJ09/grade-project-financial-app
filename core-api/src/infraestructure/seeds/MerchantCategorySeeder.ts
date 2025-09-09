import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface MerchantCategoryData {
  name: string;
}

/**
 * Seed data for merchant categories
 * Categories to classify different types of merchants
 */
const merchantCategoryData: MerchantCategoryData[] = [
  // Retail & Shopping
  { name: 'Grocery Store' },
  { name: 'Department Store' },
  { name: 'Clothing Store' },
  { name: 'Electronics Store' },
  { name: 'Pharmacy' },
  { name: 'Bookstore' },
  { name: 'Jewelry Store' },
  { name: 'Sporting Goods' },
  { name: 'Home & Garden' },
  { name: 'Pet Store' },

  // Food & Dining
  { name: 'Restaurant' },
  { name: 'Fast Food' },
  { name: 'Cafe' },
  { name: 'Bar' },
  { name: 'Bakery' },
  { name: 'Food Delivery' },

  // Services
  { name: 'Gas Station' },
  { name: 'Bank' },
  { name: 'ATM' },
  { name: 'Insurance' },
  { name: 'Healthcare' },
  { name: 'Beauty Salon' },
  { name: 'Automotive' },
  { name: 'Repair Services' },
  { name: 'Professional Services' },
  { name: 'Cleaning Services' },

  // Transportation
  { name: 'Taxi/Rideshare' },
  { name: 'Public Transport' },
  { name: 'Parking' },
  { name: 'Car Rental' },
  { name: 'Airlines' },
  { name: 'Hotels' },

  // Entertainment
  { name: 'Movie Theater' },
  { name: 'Gym/Fitness' },
  { name: 'Sports Venue' },
  { name: 'Amusement Park' },
  { name: 'Streaming Service' },

  // Utilities & Bills
  { name: 'Utility Company' },
  { name: 'Internet Provider' },
  { name: 'Phone Company' },
  { name: 'Subscription Service' },

  // Online & Digital
  { name: 'E-commerce' },
  { name: 'Digital Service' },
  { name: 'Software' },
  { name: 'Online Platform' },

  // Other
  { name: 'Government' },
  { name: 'Education' },
  { name: 'Non-profit' },
  { name: 'Other' },
];

/**
 * Seeds merchant category data into the database
 * @param prisma - Prisma client instance
 */
export async function seedMerchantCategories(
  prisma: PrismaClient
): Promise<void> {
  console.log('🏪 Seeding merchant categories...');

  try {
    // Use upsert to handle existing merchant categories
    for (const category of merchantCategoryData) {
      await prisma.merchantCategory.upsert({
        where: { name: category.name },
        update: {},
        create: category,
      });
    }

    console.log(
      `✅ Successfully seeded ${merchantCategoryData.length} merchant categories`
    );
  } catch (error) {
    console.error('❌ Failed to seed merchant categories:', error);
    throw error;
  }
}
