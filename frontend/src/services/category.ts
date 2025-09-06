import { BaseService } from '@/services/base';
import { Category } from '@/types/financial/shared';

class CategoryService extends BaseService<Category> {
  constructor() {
    super('/categories');
  }
}

export const categoryService = new CategoryService();
