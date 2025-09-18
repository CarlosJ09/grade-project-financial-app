import { ContentItem } from '@/domain/entities/ContentItem';
import { IContentItemRepository } from '@/domain/repositories/IContentItemRepository';

export type CreateContentItemInput = {
  sectionId: string;
  moduleId: number;
  sequence: number;
  title: string;
  fileUrl: string;
  markdownBody: string;
};

export class CreateContentItem {
  constructor(private contentItemRepository: IContentItemRepository) {}

  async execute(input: CreateContentItemInput): Promise<ContentItem> {
    return this.contentItemRepository.create(input);
  }
}
