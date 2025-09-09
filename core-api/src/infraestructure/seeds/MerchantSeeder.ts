import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface MerchantData {
  name: string;
  categoryName: string; // We'll resolve this to categoryId during seeding
  website?: string;
  location?: string;
}

/**
 * Seed data for merchants
 * Common merchants and businesses
 */
const merchantData: MerchantData[] = [
  // Grocery Stores
  {
    name: 'Supermercados Nacional',
    categoryName: 'Grocery Store',
    website: 'nacional.com.do',
    location: 'Dominican Republic',
  },
  {
    name: 'Jumbo',
    categoryName: 'Grocery Store',
    website: 'jumbo.com.do',
    location: 'Dominican Republic',
  },
  {
    name: 'Walmart',
    categoryName: 'Grocery Store',
    website: 'walmart.com',
    location: 'Global',
  },
  {
    name: 'La Sirena',
    categoryName: 'Grocery Store',
    location: 'Dominican Republic',
  },

  // Restaurants
  {
    name: "McDonald's",
    categoryName: 'Fast Food',
    website: 'mcdonalds.com',
    location: 'Global',
  },
  {
    name: 'Burger King',
    categoryName: 'Fast Food',
    website: 'burgerking.com',
    location: 'Global',
  },
  {
    name: 'KFC',
    categoryName: 'Fast Food',
    website: 'kfc.com',
    location: 'Global',
  },
  {
    name: 'Pizza Hut',
    categoryName: 'Restaurant',
    website: 'pizzahut.com',
    location: 'Global',
  },
  {
    name: "Domino's Pizza",
    categoryName: 'Food Delivery',
    website: 'dominos.com',
    location: 'Global',
  },

  // Gas Stations
  {
    name: 'Shell',
    categoryName: 'Gas Station',
    website: 'shell.com',
    location: 'Global',
  },
  {
    name: 'Esso',
    categoryName: 'Gas Station',
    website: 'esso.com',
    location: 'Global',
  },
  {
    name: 'Texaco',
    categoryName: 'Gas Station',
    website: 'texaco.com',
    location: 'Global',
  },
  { name: 'Isla', categoryName: 'Gas Station', location: 'Dominican Republic' },

  // Banks
  {
    name: 'Banreservas',
    categoryName: 'Bank',
    website: 'banreservas.com',
    location: 'Dominican Republic',
  },
  {
    name: 'Banco Popular',
    categoryName: 'Bank',
    website: 'bpd.com.do',
    location: 'Dominican Republic',
  },
  {
    name: 'BHD León',
    categoryName: 'Bank',
    website: 'bhdleon.com.do',
    location: 'Dominican Republic',
  },

  // Pharmacies
  {
    name: 'Farmacia Carol',
    categoryName: 'Pharmacy',
    location: 'Dominican Republic',
  },
  {
    name: 'Farmacia Chahin',
    categoryName: 'Pharmacy',
    location: 'Dominican Republic',
  },
  {
    name: 'CVS Pharmacy',
    categoryName: 'Pharmacy',
    website: 'cvs.com',
    location: 'USA',
  },

  // Online Services
  {
    name: 'Amazon',
    categoryName: 'E-commerce',
    website: 'amazon.com',
    location: 'Global',
  },
  {
    name: 'Netflix',
    categoryName: 'Streaming Service',
    website: 'netflix.com',
    location: 'Global',
  },
  {
    name: 'Spotify',
    categoryName: 'Streaming Service',
    website: 'spotify.com',
    location: 'Global',
  },
  {
    name: 'Uber',
    categoryName: 'Taxi/Rideshare',
    website: 'uber.com',
    location: 'Global',
  },
  {
    name: 'Uber Eats',
    categoryName: 'Food Delivery',
    website: 'ubereats.com',
    location: 'Global',
  },

  // Utilities
  {
    name: 'EDESUR',
    categoryName: 'Utility Company',
    location: 'Dominican Republic',
  },
  {
    name: 'EDENORTE',
    categoryName: 'Utility Company',
    location: 'Dominican Republic',
  },
  {
    name: 'CAASD',
    categoryName: 'Utility Company',
    location: 'Dominican Republic',
  },
  {
    name: 'Claro',
    categoryName: 'Phone Company',
    website: 'claro.com.do',
    location: 'Dominican Republic',
  },
  {
    name: 'Viva',
    categoryName: 'Phone Company',
    website: 'viva.com.do',
    location: 'Dominican Republic',
  },
  {
    name: 'Altice',
    categoryName: 'Internet Provider',
    website: 'altice.com.do',
    location: 'Dominican Republic',
  },

  // Department Stores
  {
    name: 'Agatha',
    categoryName: 'Department Store',
    location: 'Dominican Republic',
  },
  {
    name: 'Multicentro La Sirena',
    categoryName: 'Department Store',
    location: 'Dominican Republic',
  },

  // Generic entries for common categories
  { name: 'Generic Restaurant', categoryName: 'Restaurant' },
  { name: 'Generic Grocery', categoryName: 'Grocery Store' },
  { name: 'Generic Gas Station', categoryName: 'Gas Station' },
  { name: 'Generic Pharmacy', categoryName: 'Pharmacy' },
  { name: 'Generic ATM', categoryName: 'ATM' },
  { name: 'Generic Store', categoryName: 'Other' },
];

/**
 * Seeds merchant data into the database
 * @param prisma - Prisma client instance
 */
export async function seedMerchants(prisma: PrismaClient): Promise<void> {
  console.log('🏪 Seeding merchants...');

  try {
    // First, get all merchant categories to resolve categoryId
    const merchantCategories = await prisma.merchantCategory.findMany();
    const categoryMap = new Map(
      merchantCategories.map(cat => [cat.name, cat.id])
    );

    let seedCount = 0;

    // Use upsert to handle existing merchants
    for (const merchant of merchantData) {
      const categoryId = categoryMap.get(merchant.categoryName);

      if (!categoryId) {
        console.warn(
          `⚠️ Category '${merchant.categoryName}' not found for merchant '${merchant.name}'. Skipping...`
        );
        continue;
      }

      await prisma.merchant.upsert({
        where: { name: merchant.name },
        update: {
          categoryId,
          website: merchant.website || null,
          location: merchant.location || null,
        },
        create: {
          name: merchant.name,
          categoryId,
          website: merchant.website || null,
          location: merchant.location || null,
        },
      });

      seedCount++;
    }

    console.log(`✅ Successfully seeded ${seedCount} merchants`);
  } catch (error) {
    console.error('❌ Failed to seed merchants:', error);
    throw error;
  }
}
