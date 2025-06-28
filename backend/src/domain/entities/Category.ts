class Category {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly kind: string, // expense, income, budget
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export { Category };
