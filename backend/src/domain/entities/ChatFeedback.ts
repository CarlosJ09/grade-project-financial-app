class ChatFeedback {
  constructor(
    public readonly id: string,
    public readonly chatId: string,
    public readonly sessionId: string,
    public readonly score: number,
    public readonly comment?: string
  ) {}
}

export { ChatFeedback };
