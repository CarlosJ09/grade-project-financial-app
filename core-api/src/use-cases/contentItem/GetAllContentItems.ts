import { ContentItem } from '@/domain/entities/ContentItem';
import { IContentItemRepository } from '@/domain/repositories/IContentItemRepository';

export class GetAllContentItems {
  constructor(private contentItemRepository: IContentItemRepository) {}

  async execute(moduleId?: number): Promise<ContentItem[]> {
    return this.contentItemRepository.findAll(moduleId);
  }
}
