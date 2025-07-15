import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class BudgetStatusSeeder {
  constructor(private readonly prisma: PrismaClient) {}

  async seed(): Promise<void> {
    console.log('🌱 Seeding budget statuses...');

    const budgetStatuses = [
      {
        name: 'active',
        description: 'Budget is currently active and being used',
      },
      {
        name: 'inactive',
        description: 'Budget is temporarily inactive but not deleted',
      },
      {
        name: 'completed',
        description: 'Budget has been completed and reached its goal',
      },
    ];

    for (const budgetStatus of budgetStatuses) {
      await this.prisma.budgetStatus.upsert({
        where: { name: budgetStatus.name },
        update: {
          description: budgetStatus.description,
        },
        create: {
          name: budgetStatus.name,
          description: budgetStatus.description,
        },
      });
    }

    console.log('✅ Budget statuses seeded successfully');
  }
}
