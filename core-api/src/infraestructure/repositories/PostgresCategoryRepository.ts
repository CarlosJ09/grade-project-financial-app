import { Category } from '@/domain/entities/Category';
import { ICategoryRepository } from '@/domain/repositories/ICategoryRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresCategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    return categories.map(
      category =>
        new Category(
          category.id,
          category.name,
          category.type,
          category.createdAt,
          category.updatedAt
        )
    );
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) return null;

    return new Category(
      category.id,
      category.name,
      category.type,
      category.createdAt,
      category.updatedAt
    );
  }

  async create(
    entity: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Category> {
    const category = await this.prisma.category.create({
      data: entity,
    });

    return new Category(
      category.id,
      category.name,
      category.type,
      category.createdAt,
      category.updatedAt
    );
  }

  async update(
    id: string,
    entity: Partial<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Category> {
    const category = await this.prisma.category.update({
      where: { id },
      data: entity,
    });

    return new Category(
      category.id,
      category.name,
      category.type,
      category.createdAt,
      category.updatedAt
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id },
    });
  }
}
