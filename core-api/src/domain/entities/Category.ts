class Category {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly type: string, // expense, income, budget
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export { Category };
