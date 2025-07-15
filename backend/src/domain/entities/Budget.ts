class Budget {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly currentAmount: number,
    public readonly goalAmount: number,
    public readonly currencyId: string,
    public readonly statusId: number,
    public readonly startDate: Date,
    public readonly finishedDate: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt?: Date
  ) {}
}

export { Budget };
