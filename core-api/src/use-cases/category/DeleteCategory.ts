import { ICategoryRepository } from '@/domain/repositories/ICategoryRepository';

export class DeleteCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<boolean> {
    try {
      await this.categoryRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
