import { ICourseEnrollmentRepository } from "@/domain/repositories/ICourseEnrollmentRepository";
import { CourseEnrollment } from "@/domain/entities/CourseEnrollment";

export type UpdateCourseEnrollmentInput = {
    userId?: string;
    courseId?: string;
    enrolledAt?: Date;
    unenrolledAt?: Date;
};

export class UpdateCourseEnrollment {
    constructor(private courseEnrollmentRepository: ICourseEnrollmentRepository) { }

    async execute(id: string, input: UpdateCourseEnrollmentInput): Promise<CourseEnrollment> {
        return this.courseEnrollmentRepository.update(id, input);
    }
} 