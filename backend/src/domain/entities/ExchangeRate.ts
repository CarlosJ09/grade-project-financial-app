class ExchangeRate {
  constructor(
    public readonly id: string,
    public readonly currencyId: string,
    public readonly rate: number,
    public readonly rateDate: Date
  ) {}
}

export { ExchangeRate };
