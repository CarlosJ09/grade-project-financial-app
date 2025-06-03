class ChatMessage {
    constructor(
        public readonly id: string,
        public readonly sessionId: string,
        public readonly role: string, // user, assistant, system
        public readonly message: string,
        public readonly tokenCount: number,
        public readonly createdAt: Date,
    ) { }
}

export { ChatMessage }; 