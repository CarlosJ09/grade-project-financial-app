import { ExchangeRate } from '@/domain/entities/ExchangeRate';

export class ExchangeRateResponseDto {
  constructor(
    public readonly id: string,
    public readonly currencyId: string,
    public readonly rate: number,
    public readonly rateDate: Date
  ) {}

  static fromEntity(exchangeRate: ExchangeRate): ExchangeRateResponseDto {
    return new ExchangeRateResponseDto(
      exchangeRate.id,
      exchangeRate.currencyId,
      exchangeRate.rate,
      exchangeRate.rateDate
    );
  }
}
