import { Decimal } from '@prisma/client/runtime/library';

class ExchangeRate {
  constructor(
    public readonly id: number,
    public readonly currencyId: number,
    public readonly rate: Decimal,
    public readonly rateDate: Date
  ) {}
}

export { ExchangeRate };
