import { ICourseEnrollmentRepository } from '@/domain/repositories/ICourseEnrollmentRepository';
import { CourseEnrollment } from '@/domain/entities/CourseEnrollment';

export class GetAllCourseEnrollments {
  constructor(
    private courseEnrollmentRepository: ICourseEnrollmentRepository
  ) {}

  async execute(): Promise<CourseEnrollment[]> {
    return this.courseEnrollmentRepository.findAll();
  }
}
