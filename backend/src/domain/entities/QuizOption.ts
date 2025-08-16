class QuizOption {
  constructor(
    public readonly id: number,
    public readonly quizQuestionId: number,
    public readonly optionText: string,
    public readonly isCorrect: boolean
  ) {}
}

export { QuizOption };
