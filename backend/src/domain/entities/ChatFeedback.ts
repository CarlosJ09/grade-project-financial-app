class ChatFeedback {
  constructor(
    public readonly id: number,
    public readonly chatId: string,
    public readonly sessionId: string,
    public readonly score: number,
    public readonly comment?: string
  ) {}
}

export { ChatFeedback };
