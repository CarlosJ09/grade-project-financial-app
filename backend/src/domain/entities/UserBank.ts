class UserBank {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly bankId: string,
    public readonly alias: string,
    public readonly lastSyncAt?: Date
  ) {}
}

export { UserBank };
