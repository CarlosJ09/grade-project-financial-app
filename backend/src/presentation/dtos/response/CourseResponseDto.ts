import { Course } from '@/domain/entities/Course';

export class CourseResponseDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static fromEntity(course: Course): CourseResponseDto {
    return new CourseResponseDto(
      course.id,
      course.name,
      course.description,
      course.createdAt,
      course.updatedAt
    );
  }
}
