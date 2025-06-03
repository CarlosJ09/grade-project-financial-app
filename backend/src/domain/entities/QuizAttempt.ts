class QuizAttempt {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly contentItemId: string,
        public readonly attemptNo: number,
        public readonly status: string, // in_progress, completed, failed
        public readonly startedAt: Date,
        public readonly score: number,
        public readonly finishedAt?: Date,
    ) { }
}

export { QuizAttempt }; 