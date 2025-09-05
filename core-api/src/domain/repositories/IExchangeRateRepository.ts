import { ExchangeRate } from '@/domain/entities/ExchangeRate';
import { IBaseRepository } from './IBaseRepository';

export interface IExchangeRateRepository extends IBaseRepository<ExchangeRate> {
  findLatestRate(
    fromCurrency: string,
    toCurrency: string
  ): Promise<ExchangeRate | null>;
}
