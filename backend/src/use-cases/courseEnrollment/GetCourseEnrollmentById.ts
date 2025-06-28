import { ICourseEnrollmentRepository } from '@/domain/repositories/ICourseEnrollmentRepository';
import { CourseEnrollment } from '@/domain/entities/CourseEnrollment';

export class GetCourseEnrollmentById {
  constructor(
    private courseEnrollmentRepository: ICourseEnrollmentRepository
  ) {}

  async execute(id: string): Promise<CourseEnrollment | null> {
    return this.courseEnrollmentRepository.findById(id);
  }
}
