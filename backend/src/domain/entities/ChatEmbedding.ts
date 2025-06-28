class ChatEmbedding {
  constructor(
    public readonly id: string,
    public readonly messageId: string,
    public readonly vector: string // pgvector type in production
  ) {}
}

export { ChatEmbedding };
