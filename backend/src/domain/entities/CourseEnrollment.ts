class CourseEnrollment {
  constructor(
    public readonly id: number,
    public readonly userId: string,
    public readonly courseId: string,
    public readonly enrolledAt: Date,
    public readonly unenrolledAt?: Date
  ) {}
}

export { CourseEnrollment };
