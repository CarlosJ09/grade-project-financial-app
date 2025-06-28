class QuizAttemptAnswer {
  constructor(
    public readonly id: string,
    public readonly quizAttemptId: string,
    public readonly quizQuestionId: string
  ) {}
}

export { QuizAttemptAnswer };
