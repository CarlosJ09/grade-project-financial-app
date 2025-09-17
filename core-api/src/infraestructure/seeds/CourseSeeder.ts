import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

interface CourseData {
  name: string;
  description: string;
}

/**
 * Seed data for courses
 * Educational courses focused on financial literacy and personal finance
 */
const courseData: CourseData[] = [
  {
    name: 'Financial Literacy Basics',
    description:
      'Learn the fundamentals of personal finance, budgeting, and money management. Perfect for beginners who want to take control of their financial future.',
  },
  {
    name: 'Investment Fundamentals',
    description:
      'Understand different investment types, risk management, and building a diversified portfolio. Start your journey to wealth building.',
  },
  {
    name: 'Budgeting Mastery',
    description:
      'Master the art of creating and maintaining effective budgets for your financial goals. Learn advanced budgeting techniques and tools.',
  },
  {
    name: 'Debt Management Strategies',
    description:
      'Learn how to effectively manage and eliminate debt. Understand different debt repayment strategies and how to avoid debt traps.',
  },
  {
    name: 'Retirement Planning',
    description:
      'Plan for a secure financial future with comprehensive retirement planning strategies. Learn about retirement accounts, savings goals, and investment options.',
  },
  {
    name: 'Emergency Fund Essentials',
    description:
      'Build and maintain an emergency fund to protect yourself from financial emergencies. Learn how much to save and where to keep it.',
  },
  {
    name: 'Understanding Credit',
    description:
      'Master the fundamentals of credit scores, credit reports, and how to build and maintain excellent credit for better financial opportunities.',
  },
  {
    name: 'Tax Planning Basics',
    description:
      'Learn essential tax planning strategies to minimize your tax burden and maximize your savings throughout the year.',
  },
];

/**
 * Seed courses into the database
 */
export async function seedCourses(prisma: PrismaClient): Promise<void> {
  console.log('📚 Seeding courses...');

  try {
    // Check if courses already exist
    const existingCount = await prisma.course.count();
    if (existingCount > 0) {
      console.log(
        `📚 Courses already exist (${existingCount} found), skipping...`
      );
      return;
    }

    // Create courses
    const courses = await prisma.course.createMany({
      data: courseData,
      skipDuplicates: true,
    });

    console.log(`📚 Successfully seeded ${courses.count} courses`);

    // Log the created courses for reference
    const createdCourses = await prisma.course.findMany({
      select: { id: true, name: true },
      orderBy: { id: 'asc' },
    });

    console.log('📚 Created courses:');
    createdCourses.forEach(course => {
      console.log(`   ${course.id}: ${course.name}`);
    });
  } catch (error) {
    console.error('❌ Error seeding courses:', error);
    throw error;
  }
}
