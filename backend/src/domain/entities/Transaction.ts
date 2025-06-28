class Transaction {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly amount: number,
    public readonly currencyId: string,
    public readonly exchangeRateId: string | null,
    public readonly type: string, // expense, income
    public readonly categoryId: string,
    public readonly paymentMethodId: string,
    public readonly place: string,
    public readonly bankingProductId: string | null,
    public readonly transactionDate: Date,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt?: Date
  ) {}
}

export { Transaction };
