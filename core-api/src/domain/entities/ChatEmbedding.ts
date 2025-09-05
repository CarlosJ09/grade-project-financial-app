class ChatEmbedding {
  constructor(
    public readonly id: number,
    public readonly messageId: string,
    public readonly vector: string // pgvector type in production
  ) {}
}

export { ChatEmbedding };
