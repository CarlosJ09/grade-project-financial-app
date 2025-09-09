class Merchant {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly categoryId: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly website?: string,
    public readonly location?: string
  ) {}
}

export { Merchant };
