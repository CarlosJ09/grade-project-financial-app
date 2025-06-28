import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

/**
 * Singleton Database connection manager
 * Ensures only one PrismaClient instance exists throughout the application
 */
export class Database {
  private static instance: PrismaClient;

  /**
   * Get the singleton PrismaClient instance
   */
  public static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient({
        log:
          process.env.NODE_ENV === 'development'
            ? ['query', 'info', 'warn', 'error']
            : ['error'],
      });
    }
    return Database.instance;
  }

  /**
   * Connect to the database
   */
  public static async connect(): Promise<void> {
    try {
      await Database.getInstance().$connect();
      console.log('✅ Database connected successfully');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      throw error;
    }
  }

  /**
   * Disconnect from the database
   */
  public static async disconnect(): Promise<void> {
    try {
      await Database.getInstance().$disconnect();
      console.log('✅ Database disconnected successfully');
    } catch (error) {
      console.error('❌ Database disconnection failed:', error);
      throw error;
    }
  }
}
