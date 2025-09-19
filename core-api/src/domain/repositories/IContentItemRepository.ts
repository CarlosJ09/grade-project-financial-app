import { ContentItem } from '@/domain/entities/ContentItem';
import { IBaseRepository } from './IBaseRepository';

export interface IContentItemRepository extends IBaseRepository<ContentItem> {
  findAll(moduleId?: number): Promise<ContentItem[]>;
}
