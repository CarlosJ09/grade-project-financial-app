class UserBankingProduct {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly bankBankingProductId: number,
    public readonly referenceNumber: string,
    public readonly label: string,
    public readonly currencyId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export { UserBankingProduct };
