class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly dateOfBirth: Date,
    public readonly passwordHash: string,
    public readonly status: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

export { User };
