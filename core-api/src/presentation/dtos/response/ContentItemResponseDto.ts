import { ContentItem } from '@/domain/entities/ContentItem';

export class ContentItemResponseDto {
  constructor(
    public readonly id: number,
    public readonly sectionId: string,
    public readonly moduleId: string,
    public readonly sequence: number,
    public readonly title: string,
    public readonly fileUrl: string,
    public readonly markdownBody: string
  ) {}

  static fromEntity(contentItem: ContentItem): ContentItemResponseDto {
    return new ContentItemResponseDto(
      contentItem.id,
      contentItem.sectionId,
      contentItem.moduleId,
      contentItem.sequence,
      contentItem.title,
      contentItem.fileUrl,
      contentItem.markdownBody
    );
  }
}
