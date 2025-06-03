class Recommendation {
    constructor(
        public readonly id: string,
        public readonly sessionId: string,
        public readonly type: string, // budget_suggestion, investment_tip, etc.
        public readonly message: string,
        public readonly accepted: boolean,
        public readonly sentAt: Date,
        public readonly acceptedAt?: Date,
    ) { }
}

export { Recommendation }; 