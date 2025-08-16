class ExchangeRate {
  constructor(
    public readonly id: number,
    public readonly currencyId: number,
    public readonly rate: number,
    public readonly rateDate: Date
  ) {}
}

export { ExchangeRate };
