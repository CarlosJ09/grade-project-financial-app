import { ICourseEnrollmentRepository } from "@/domain/repositories/ICourseEnrollmentRepository";
import { CourseEnrollment } from "@/domain/entities/CourseEnrollment";

export type CreateCourseEnrollmentInput = {
    userId: string;
    courseId: string;
    enrolledAt: Date;
    unenrolledAt?: Date;
};

export class CreateCourseEnrollment {
    constructor(private courseEnrollmentRepository: ICourseEnrollmentRepository) { }

    async execute(input: CreateCourseEnrollmentInput): Promise<CourseEnrollment> {
        return this.courseEnrollmentRepository.create(input);
    }
} 