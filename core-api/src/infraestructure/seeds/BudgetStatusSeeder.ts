import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

const budgetStatuses = [
  {
    name: 'Active',
    description: 'Budget active and in use',
  },
  {
    name: 'Inactive',
    description: 'Budget inactive but not deleted',
  },
  {
    name: 'Completed',
    description: 'Budget completed and reached its goal',
  },
];

export async function seedBudgetStatuses(prisma: PrismaClient): Promise<void> {
  try {
    console.log('🌱 Seeding budget statuses...');

    for (const budgetStatus of budgetStatuses) {
      await prisma.budgetStatus.upsert({
        where: { name: budgetStatus.name },
        update: {
          description: budgetStatus.description,
        },
        create: budgetStatus,
      });
    }

    console.log('✅ Budget statuses seeded successfully');
  } catch (error) {
    console.error('❌ Failed to seed budget statuses:', error);
    throw error;
  }
}
