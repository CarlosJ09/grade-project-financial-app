import { ICategoryRepository } from '@/domain/repositories/ICategoryRepository';
import { Category } from '@/domain/entities/Category';

export type CreateCategoryInput = {
  name: string;
  kind: string;
};

export class CreateCategory {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(input: CreateCategoryInput): Promise<Category> {
    return this.categoryRepository.create(input);
  }
}
