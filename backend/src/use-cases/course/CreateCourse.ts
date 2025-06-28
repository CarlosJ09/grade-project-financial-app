import { ICourseRepository } from '@/domain/repositories/ICourseRepository';
import { Course } from '@/domain/entities/Course';

export type CreateCourseInput = {
  name: string;
  description: string;
};

export class CreateCourse {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(input: CreateCourseInput): Promise<Course> {
    return this.courseRepository.create(input);
  }
}
