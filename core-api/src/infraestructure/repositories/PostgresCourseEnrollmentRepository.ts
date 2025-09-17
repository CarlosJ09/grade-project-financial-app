import { CourseEnrollment } from '@/domain/entities/CourseEnrollment';
import { ICourseEnrollmentRepository } from '@/domain/repositories/ICourseEnrollmentRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresCourseEnrollmentRepository
  implements ICourseEnrollmentRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<CourseEnrollment[]> {
    const courseEnrollments = await this.prisma.courseEnrollment.findMany();
    return courseEnrollments.map(
      courseEnrollment =>
        new CourseEnrollment(
          courseEnrollment.id,
          courseEnrollment.userId,
          courseEnrollment.courseId,
          courseEnrollment.enrolledAt,
          courseEnrollment.unenrolledAt || undefined
        )
    );
  }

  async findById(id: number): Promise<CourseEnrollment | null> {
    const courseEnrollment = await this.prisma.courseEnrollment.findUnique({
      where: { id },
    });

    if (!courseEnrollment) return null;

    return new CourseEnrollment(
      courseEnrollment.id,
      courseEnrollment.userId,
      courseEnrollment.courseId,
      courseEnrollment.enrolledAt,
      courseEnrollment.unenrolledAt || undefined
    );
  }

  async create(
    entity: Omit<CourseEnrollment, 'id'>
  ): Promise<CourseEnrollment> {
    const courseEnrollment = await this.prisma.courseEnrollment.create({
      data: {
        ...entity,
        unenrolledAt: entity.unenrolledAt || null,
      },
    });

    return new CourseEnrollment(
      courseEnrollment.id,
      courseEnrollment.userId,
      courseEnrollment.courseId,
      courseEnrollment.enrolledAt,
      courseEnrollment.unenrolledAt || undefined
    );
  }

  async update(
    id: number,
    entity: Partial<Omit<CourseEnrollment, 'id'>>
  ): Promise<CourseEnrollment> {
    const updateData: any = { ...entity };

    // Handle nullable unenrolledAt properly
    if (entity.unenrolledAt !== undefined) {
      updateData.unenrolledAt = entity.unenrolledAt || null;
    }

    const courseEnrollment = await this.prisma.courseEnrollment.update({
      where: { id },
      data: updateData,
    });

    return new CourseEnrollment(
      courseEnrollment.id,
      courseEnrollment.userId,
      courseEnrollment.courseId,
      courseEnrollment.enrolledAt,
      courseEnrollment.unenrolledAt || undefined
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.courseEnrollment.delete({
      where: { id },
    });
  }
}
