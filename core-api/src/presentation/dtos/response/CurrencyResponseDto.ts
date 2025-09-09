import { Currency } from '@/domain/entities/Currency';

export class CurrencyResponseDto {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly code: string,
    public readonly symbol: string
  ) {}

  static fromEntity(currency: Currency): CurrencyResponseDto {
    return new CurrencyResponseDto(
      currency.id,
      currency.name,
      currency.code,
      currency.symbol
    );
  }
}
