import { ICourseRepository } from "@/domain/repositories/ICourseRepository";
import { Course } from "@/domain/entities/Course";

export type UpdateCourseInput = {
    name?: string;
    description?: string;
};

export class UpdateCourse {
    constructor(private courseRepository: ICourseRepository) { }

    async execute(id: string, input: UpdateCourseInput): Promise<Course> {
        return this.courseRepository.update(id, input);
    }
} 