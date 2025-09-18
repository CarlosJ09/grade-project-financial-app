import { Course } from '@/domain/entities/Course';
import { ICourseRepository } from '@/domain/repositories/ICourseRepository';

export class GetCourseById {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(id: number): Promise<Course | null> {
    return this.courseRepository.findById(id);
  }
}
