import { IContentItemRepository } from "@/domain/repositories/IContentItemRepository";
import { ContentItem } from "@/domain/entities/ContentItem";

export type UpdateContentItemInput = {
    sectionId?: string;
    moduleId?: string;
    sequence?: number;
    title?: string;
    fileUrl?: string;
    markdownBody?: string;
};

export class UpdateContentItem {
    constructor(private contentItemRepository: IContentItemRepository) { }

    async execute(id: string, input: UpdateContentItemInput): Promise<ContentItem> {
        return this.contentItemRepository.update(id, input);
    }
} 