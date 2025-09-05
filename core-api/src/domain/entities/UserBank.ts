class UserBank {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly bankId: number,
    public readonly alias: string,
    public readonly lastSyncAt?: Date
  ) {}
}

export { UserBank };
