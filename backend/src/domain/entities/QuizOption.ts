class QuizOption {
  constructor(
    public readonly id: string,
    public readonly quizQuestionId: string,
    public readonly optionText: string,
    public readonly isCorrect: boolean
  ) {}
}

export { QuizOption };
