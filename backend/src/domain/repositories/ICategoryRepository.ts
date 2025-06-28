import { Category } from '@/domain/entities/Category';
import { IBaseRepository } from './IBaseRepository';

export interface ICategoryRepository extends IBaseRepository<Category> {}
