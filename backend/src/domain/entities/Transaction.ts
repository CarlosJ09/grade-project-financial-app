class Transaction {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly amount: number,
    public readonly currencyId: number,
    public readonly exchangeRateId: number | null,
    public readonly type: string, // expense, income
    public readonly categoryId: number,
    public readonly paymentMethodId: number,
    public readonly place: string,
    public readonly bankingProductId: number | null,
    public readonly transactionDate: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt?: Date
  ) {}
}

export { Transaction };
