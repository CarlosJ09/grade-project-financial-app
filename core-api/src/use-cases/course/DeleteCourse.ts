import { ICourseRepository } from '@/domain/repositories/ICourseRepository';

export class DeleteCourse {
  constructor(private courseRepository: ICourseRepository) {}

  async execute(id: number): Promise<boolean> {
    try {
      await this.courseRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
