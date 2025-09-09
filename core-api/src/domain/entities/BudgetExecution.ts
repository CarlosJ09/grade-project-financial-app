class BudgetExecution {
  constructor(
    public readonly id: number,
    public readonly budgetId: string,
    public readonly transactionId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export { BudgetExecution };
