import { ICategoryRepository } from '@/domain/repositories/ICategoryRepository';
import { Category } from '@/domain/entities/Category';

export class GetCategoryById {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<Category | null> {
    return this.categoryRepository.findById(id);
  }
}
