import { CourseEnrollment } from '@/domain/entities/CourseEnrollment';

export class CourseEnrollmentResponseDto {
  constructor(
    public readonly id: number,
    public readonly userId: string,
    public readonly courseId: string,
    public readonly enrolledAt: Date,
    public readonly unenrolledAt?: Date
  ) {}

  static fromEntity(
    courseEnrollment: CourseEnrollment
  ): CourseEnrollmentResponseDto {
    return new CourseEnrollmentResponseDto(
      courseEnrollment.id,
      courseEnrollment.userId,
      courseEnrollment.courseId,
      courseEnrollment.enrolledAt,
      courseEnrollment.unenrolledAt
    );
  }
}
