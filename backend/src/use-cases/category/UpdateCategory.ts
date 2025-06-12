import { ICategoryRepository } from "@/domain/repositories/ICategoryRepository";
import { Category } from "@/domain/entities/Category";

export type UpdateCategoryInput = {
    name?: string;
    kind?: string;
};

export class UpdateCategory {
    constructor(private categoryRepository: ICategoryRepository) { }

    async execute(id: string, input: UpdateCategoryInput): Promise<Category> {
        return this.categoryRepository.update(id, input);
    }
} 