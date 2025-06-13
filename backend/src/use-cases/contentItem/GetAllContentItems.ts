import { IContentItemRepository } from "@/domain/repositories/IContentItemRepository";
import { ContentItem } from "@/domain/entities/ContentItem";

export class GetAllContentItems {
    constructor(private contentItemRepository: IContentItemRepository) { }

    async execute(): Promise<ContentItem[]> {
        return this.contentItemRepository.findAll();
    }
} 