import { ContentItem } from '@/domain/entities/ContentItem';
import { IContentItemRepository } from '@/domain/repositories/IContentItemRepository';

export type UpdateContentItemInput = {
  sectionId?: string;
  moduleId?: number;
  sequence?: number;
  title?: string;
  fileUrl?: string;
  markdownBody?: string;
};

export class UpdateContentItem {
  constructor(private contentItemRepository: IContentItemRepository) {}

  async execute(
    id: number,
    input: UpdateContentItemInput
  ): Promise<ContentItem> {
    return this.contentItemRepository.update(id, input);
  }
}
