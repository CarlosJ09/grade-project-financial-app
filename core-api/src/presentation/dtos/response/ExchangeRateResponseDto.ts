import { ExchangeRate } from '@/domain/entities/ExchangeRate';

export class ExchangeRateResponseDto {
  constructor(
    public readonly id: number,
    public readonly currencyId: number,
    public readonly rate: number,
    public readonly rateDate: Date
  ) {}

  static fromEntity(exchangeRate: ExchangeRate): ExchangeRateResponseDto {
    return new ExchangeRateResponseDto(
      exchangeRate.id,
      exchangeRate.currencyId,
      exchangeRate.rate.toNumber(),
      exchangeRate.rateDate
    );
  }
}
