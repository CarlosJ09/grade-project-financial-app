import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

const budgetStatuses = [
  {
    name: 'active',
    description: 'Presupuesto activo y en uso',
  },
  {
    name: 'inactive',
    description: 'Presupuesto inactivo pero no eliminado',
  },
  {
    name: 'completed',
    description: 'Presupuesto completado y alcanzó su objetivo',
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
