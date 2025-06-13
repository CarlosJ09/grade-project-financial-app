import { IContentItemRepository } from "@/domain/repositories/IContentItemRepository";
import { ContentItem } from "@/domain/entities/ContentItem";

export class GetContentItemById {
    constructor(private contentItemRepository: IContentItemRepository) { }

    async execute(id: string): Promise<ContentItem | null> {
        return this.contentItemRepository.findById(id);
    }
} 