class UserBank {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly bankId: number,
    public readonly alias: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export { UserBank };
