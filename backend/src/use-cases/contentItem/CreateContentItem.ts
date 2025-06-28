import { IContentItemRepository } from '@/domain/repositories/IContentItemRepository';
import { ContentItem } from '@/domain/entities/ContentItem';

export type CreateContentItemInput = {
  sectionId: string;
  moduleId: string;
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
