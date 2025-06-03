class CourseEnrollment {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly courseId: string,
        public readonly enrolledAt: Date,
        public readonly unenrolledAt?: Date,
    ) { }
}

export { CourseEnrollment }; 