class QuizAttemptAnswer {
  constructor(
    public readonly id: number,
    public readonly quizAttemptId: number,
    public readonly quizQuestionId: number
  ) {}
}

export { QuizAttemptAnswer };
