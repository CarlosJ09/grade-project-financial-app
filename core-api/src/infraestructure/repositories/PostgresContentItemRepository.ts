import { ContentItem } from '@/domain/entities/ContentItem';
import { IContentItemRepository } from '@/domain/repositories/IContentItemRepository';
import { PrismaClient } from '@/infraestructure/prisma/generated/prisma';

export class PostgresContentItemRepository implements IContentItemRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<ContentItem[]> {
    const contentItems = await this.prisma.contentItem.findMany();
    return contentItems.map(
      contentItem =>
        new ContentItem(
          contentItem.id,
          contentItem.sectionId,
          contentItem.moduleId,
          contentItem.sequence,
          contentItem.title,
          contentItem.fileUrl,
          contentItem.markdownBody
        )
    );
  }

  async findById(id: number): Promise<ContentItem | null> {
    const contentItem = await this.prisma.contentItem.findUnique({
      where: { id: Number(id) },
    });

    if (!contentItem) return null;

    return new ContentItem(
      contentItem.id,
      contentItem.sectionId,
      contentItem.moduleId,
      contentItem.sequence,
      contentItem.title,
      contentItem.fileUrl,
      contentItem.markdownBody
    );
  }

  async create(entity: Omit<ContentItem, 'id'>): Promise<ContentItem> {
    const contentItem = await this.prisma.contentItem.create({
      data: entity,
    });

    return new ContentItem(
      contentItem.id,
      contentItem.sectionId,
      contentItem.moduleId,
      contentItem.sequence,
      contentItem.title,
      contentItem.fileUrl,
      contentItem.markdownBody
    );
  }

  async update(
    id: string,
    entity: Partial<Omit<ContentItem, 'id'>>
  ): Promise<ContentItem> {
    const contentItem = await this.prisma.contentItem.update({
      where: { id: Number(id) },
      data: entity,
    });

    return new ContentItem(
      contentItem.id,
      contentItem.sectionId,
      contentItem.moduleId,
      contentItem.sequence,
      contentItem.title,
      contentItem.fileUrl,
      contentItem.markdownBody
    );
  }

  async delete(id: number): Promise<void> {
    await this.prisma.contentItem.delete({
      where: { id: Number(id) },
    });
  }
}
