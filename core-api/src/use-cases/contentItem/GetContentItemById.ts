import { ContentItem } from '@/domain/entities/ContentItem';
import { IContentItemRepository } from '@/domain/repositories/IContentItemRepository';

export class GetContentItemById {
  constructor(private contentItemRepository: IContentItemRepository) {}

  async execute(id: number): Promise<ContentItem | null> {
    return this.contentItemRepository.findById(id);
  }
}
