import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface ModuleData {
  courseId: number;
  contentItem: string;
  sequence: number;
  summary: string;
  estimatedMinutes: number;
  prerequisiteModuleId?: number;
}

/**
 * Seed data for modules
 * Educational modules for each course, organized by sequence
 */
const moduleData: ModuleData[] = [
  // Financial Literacy Basics (Course ID: 1)
  {
    courseId: 1,
    contentItem: 'Introduction to Personal Finance',
    sequence: 1,
    summary:
      'Understanding the basics of money management and financial planning. Learn what personal finance is and why it matters.',
    estimatedMinutes: 15,
  },
  {
    courseId: 1,
    contentItem: 'Understanding Income and Expenses',
    sequence: 2,
    summary:
      'Learn to track and categorize your money flow. Understand different types of income and expense categories.',
    estimatedMinutes: 20,
  },
  {
    courseId: 1,
    contentItem: 'Building Your First Budget',
    sequence: 3,
    summary:
      'Step-by-step guide to creating a personal budget. Learn different budgeting methods and tools.',
    estimatedMinutes: 25,
  },
  {
    courseId: 1,
    contentItem: 'Setting Financial Goals',
    sequence: 4,
    summary:
      'Learn how to set SMART financial goals and create a plan to achieve them.',
    estimatedMinutes: 18,
  },

  // Investment Fundamentals (Course ID: 2)
  {
    courseId: 2,
    contentItem: 'What is Investing?',
    sequence: 1,
    summary:
      'Basic concepts and principles of investing. Understand the difference between saving and investing.',
    estimatedMinutes: 18,
  },
  {
    courseId: 2,
    contentItem: 'Types of Investments',
    sequence: 2,
    summary:
      'Stocks, bonds, mutual funds, and other investment vehicles. Learn the pros and cons of each.',
    estimatedMinutes: 22,
  },
  {
    courseId: 2,
    contentItem: 'Risk and Return',
    sequence: 3,
    summary:
      'Understanding the relationship between risk and potential returns. Learn about risk tolerance.',
    estimatedMinutes: 20,
  },
  {
    courseId: 2,
    contentItem: 'Building a Portfolio',
    sequence: 4,
    summary:
      'Learn how to create a diversified investment portfolio that matches your goals and risk tolerance.',
    estimatedMinutes: 25,
  },

  // Budgeting Mastery (Course ID: 3)
  {
    courseId: 3,
    contentItem: 'Advanced Budgeting Techniques',
    sequence: 1,
    summary:
      'Beyond basic budgeting - learn zero-based budgeting, envelope method, and other advanced techniques.',
    estimatedMinutes: 22,
  },
  {
    courseId: 3,
    contentItem: 'Budgeting Tools and Apps',
    sequence: 2,
    summary:
      'Explore digital tools and apps that can help automate and simplify your budgeting process.',
    estimatedMinutes: 18,
  },
  {
    courseId: 3,
    contentItem: 'Handling Budget Variances',
    sequence: 3,
    summary:
      'What to do when your actual spending differs from your budget. Learn how to adjust and stay on track.',
    estimatedMinutes: 20,
  },

  // Debt Management Strategies (Course ID: 4)
  {
    courseId: 4,
    contentItem: 'Understanding Different Types of Debt',
    sequence: 1,
    summary:
      'Learn about good debt vs bad debt, and understand different types of loans and credit.',
    estimatedMinutes: 20,
  },
  {
    courseId: 4,
    contentItem: 'Debt Repayment Strategies',
    sequence: 2,
    summary:
      'Explore debt snowball, debt avalanche, and other proven debt repayment methods.',
    estimatedMinutes: 25,
  },
  {
    courseId: 4,
    contentItem: 'Debt Consolidation Options',
    sequence: 3,
    summary:
      'When and how to consider debt consolidation. Understand the pros and cons of different options.',
    estimatedMinutes: 22,
  },

  // Emergency Fund Essentials (Course ID: 6)
  {
    courseId: 6,
    contentItem: 'Why You Need an Emergency Fund',
    sequence: 1,
    summary:
      'Understand the importance of emergency funds and how they protect your financial stability.',
    estimatedMinutes: 15,
  },
  {
    courseId: 6,
    contentItem: 'How Much to Save',
    sequence: 2,
    summary:
      'Learn how to calculate the right emergency fund size for your situation and goals.',
    estimatedMinutes: 18,
  },
  {
    courseId: 6,
    contentItem: 'Where to Keep Your Emergency Fund',
    sequence: 3,
    summary:
      'Discover the best places to store your emergency fund for accessibility and growth.',
    estimatedMinutes: 20,
  },
];

/**
 * Seed modules into the database
 */
export async function seedModules(prisma: PrismaClient): Promise<void> {
  console.log('📖 Seeding modules...');

  try {
    // Check if modules already exist
    const existingCount = await prisma.module.count();
    if (existingCount > 0) {
      console.log(
        `📖 Modules already exist (${existingCount} found), skipping...`
      );
      return;
    }

    // Verify courses exist first
    const courseCount = await prisma.course.count();
    if (courseCount === 0) {
      throw new Error('No courses found. Please seed courses first.');
    }

    // Create modules with release dates
    const modulesToCreate = moduleData.map(module => ({
      ...module,
      releaseAt: new Date(), // All modules available immediately for demo
    }));

    const modules = await prisma.module.createMany({
      data: modulesToCreate,
      skipDuplicates: true,
    });

    console.log(`📖 Successfully seeded ${modules.count} modules`);

    // Log the created modules for reference
    const createdModules = await prisma.module.findMany({
      select: {
        id: true,
        contentItem: true,
        courseId: true,
        sequence: true,
      },
      orderBy: [{ courseId: 'asc' }, { sequence: 'asc' }],
    });

    console.log('📖 Created modules:');
    createdModules.forEach(module => {
      console.log(
        `   ${module.id}: Course ${module.courseId} - Module ${module.sequence}: ${module.contentItem}`
      );
    });
  } catch (error) {
    console.error('❌ Error seeding modules:', error);
    throw error;
  }
}
