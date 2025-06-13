import { ICourseRepository } from "@/domain/repositories/ICourseRepository";
import { Course } from "@/domain/entities/Course";

export class GetCourseById {
    constructor(private courseRepository: ICourseRepository) { }

    async execute(id: string): Promise<Course | null> {
        return this.courseRepository.findById(id);
    }
} 