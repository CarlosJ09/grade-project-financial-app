import { IContentItemRepository } from "@/domain/repositories/IContentItemRepository";

export class DeleteContentItem {
    constructor(private contentItemRepository: IContentItemRepository) { }

    async execute(id: string): Promise<boolean> {
        try {
            await this.contentItemRepository.delete(id);
            return true;
        } catch (error) {
            return false;
        }
    }
} 