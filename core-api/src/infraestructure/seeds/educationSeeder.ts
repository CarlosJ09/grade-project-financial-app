import { Database } from '@/infraestructure/config/Database';
import { seedContentItems } from '@/infraestructure/seeds/ContentItemSeeder';
import { seedCourses } from '@/infraestructure/seeds/CourseSeeder';
import { seedModules } from '@/infraestructure/seeds/ModuleSeeder';
import { seedQuizzes } from '@/infraestructure/seeds/QuizSeeder';

/**
 * Seed only education-related data
 */
export async function seedEducationData(): Promise<void> {
  const prisma = Database.getInstance();

  try {
    console.log('📚 Starting education module seeding...');

    // Seed in order of dependencies
    await seedCourses(prisma);
    await seedModules(prisma); // Requires courses
    await seedContentItems(prisma); // Requires modules
    await seedQuizzes(prisma); // Requires content items

    console.log('✅ Education module seeding completed successfully');
  } catch (error) {
    console.error('❌ Education module seeding failed:', error);
    throw error;
  }
}

/**
 * Clear only education-related data
 */
export async function clearEducationData(): Promise<void> {
  const prisma = Database.getInstance();

  try {
    console.log('🧹 Clearing education data...');

    // Clear in reverse order of dependencies
    await prisma.quizAttemptAnswer.deleteMany({});
    await prisma.quizAttempt.deleteMany({});
    await prisma.quizOption.deleteMany({});
    await prisma.quizQuestion.deleteMany({});
    await prisma.contentItem.deleteMany({});
    await prisma.userModuleProgress.deleteMany({});
    await prisma.module.deleteMany({});
    await prisma.courseEnrollment.deleteMany({});
    await prisma.course.deleteMany({});

    console.log('✅ Education data cleared successfully');
  } catch (error) {
    console.error('❌ Failed to clear education data:', error);
    throw error;
  }
}

/**
 * Main execution function for education seeder
 */
async function main() {
  try {
    console.log('🚀 Initializing education seeding process...');

    const command = process.argv[2] || 'seed';
    console.log(`📋 Command: ${command}`);

    // Connect to database
    console.log('🔌 Connecting to database...');
    await Database.connect();
    console.log('✅ Database connected');

    // Execute command
    switch (command) {
      case 'clear':
        await clearEducationData();
        break;
      case 'seed':
      default:
        await seedEducationData();
        break;
    }
  } catch (error) {
    console.error('❌ Education seeding operation failed:', error);
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

// Run the main function if this file is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Unhandled error in main:', error);
    process.exit(1);
  });
}
