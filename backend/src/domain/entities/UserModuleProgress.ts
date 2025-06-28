class UserModuleProgress {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly moduleId: string,
    public readonly status: string, // Enum: not_started, in_progress, completed
    public readonly progressPercent: number,
    public readonly startedAt: Date,
    public readonly completedAt?: Date
  ) {}
}

export { UserModuleProgress };
