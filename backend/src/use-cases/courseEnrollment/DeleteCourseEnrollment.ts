import { ICourseEnrollmentRepository } from "@/domain/repositories/ICourseEnrollmentRepository";

export class DeleteCourseEnrollment {
    constructor(private courseEnrollmentRepository: ICourseEnrollmentRepository) { }

    async execute(id: string): Promise<boolean> {
        try {
            await this.courseEnrollmentRepository.delete(id);
            return true;
        } catch (error) {
            return false;
        }
    }
} 