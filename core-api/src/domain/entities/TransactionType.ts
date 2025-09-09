class TransactionType {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export { TransactionType };
