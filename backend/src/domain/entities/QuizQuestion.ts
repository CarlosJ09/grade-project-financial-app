class QuizQuestion {
  constructor(
    public readonly id: number,
    public readonly contentItemId: number,
    public readonly questionText: string,
    public readonly questionType: string, // multiple_choice, true_false, etc.
    public readonly explanation: string
  ) {}
}

export { QuizQuestion };
