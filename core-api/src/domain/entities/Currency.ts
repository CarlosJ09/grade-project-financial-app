class Currency {
  constructor(
    public readonly id: number,
    public readonly code: string, // 3-character currency code
    public readonly name: string,
    public readonly symbol: string
  ) {}
}

export { Currency };
