class QuizQuestion {
  constructor(
    public readonly id: string,
    public readonly contentItemId: string,
    public readonly questionText: string,
    public readonly questionType: string, // multiple_choice, true_false, etc.
    public readonly explanation: string
  ) {}
}

export { QuizQuestion };
