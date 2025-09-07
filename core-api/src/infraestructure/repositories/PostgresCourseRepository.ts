import { Course } from '@/domain/entities/Course';
import { ICourseRepository } from '@/domain/repositories/ICourseRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresCourseRepository implements ICourseRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Course[]> {
    const courses = await this.prisma.course.findMany();
    return courses.map(
      course =>
        new Course(
          course.id,
          course.name,
          course.description,
          course.createdAt,
          course.updatedAt
        )
    );
  }

  async findById(id: number): Promise<Course | null> {
    const course = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!course) return null;

    return new Course(
      course.id,
      course.name,
      course.description,
      course.createdAt,
      course.updatedAt
    );
  }

  async create(
    entity: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Course> {
    const course = await this.prisma.course.create({
      data: entity,
    });

    return new Course(
      course.id,
      course.name,
      course.description,
      course.createdAt,
      course.updatedAt
    );
  }

  async update(
    id: number,
    entity: Partial<Omit<Course, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Course> {
    const course = await this.prisma.course.update({
      where: { id },
      data: entity,
    });

    return new Course(
      course.id,
      course.name,
      course.description,
      course.createdAt,
      course.updatedAt
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.course.delete({
      where: { id },
    });
  }
}
