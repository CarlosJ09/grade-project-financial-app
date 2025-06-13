import { ICourseRepository } from "@/domain/repositories/ICourseRepository";

export class DeleteCourse {
    constructor(private courseRepository: ICourseRepository) { }

    async execute(id: string): Promise<boolean> {
        try {
            await this.courseRepository.delete(id);
            return true;
        } catch (error) {
            return false;
        }
    }
} 