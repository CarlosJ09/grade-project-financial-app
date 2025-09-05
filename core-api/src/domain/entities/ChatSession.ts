class ChatSession {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly startedAt: Date,
    public readonly createdAt: Date,
    public readonly closedAt?: Date
  ) {}
}

export { ChatSession };
