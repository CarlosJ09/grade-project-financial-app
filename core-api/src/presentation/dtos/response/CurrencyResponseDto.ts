import { Currency } from '@/domain/entities/Currency';

export class CurrencyResponseDto {
  constructor(
    public readonly id: number,
    public readonly currency: string
  ) {}

  static fromEntity(currency: Currency): CurrencyResponseDto {
    return new CurrencyResponseDto(currency.id, currency.currency);
  }
}
