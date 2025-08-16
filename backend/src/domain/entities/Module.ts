class Module {
  constructor(
    public readonly id: number,
    public readonly courseId: number,
    public readonly contentItem: string,
    public readonly sequence: number,
    public readonly summary: string,
    public readonly estimatedMinutes: number,
    public readonly releaseAt: Date,
    public readonly prerequisiteModuleId?: number
  ) {}
}

export { Module };
