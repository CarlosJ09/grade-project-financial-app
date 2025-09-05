import { IExchangeRateRepository } from '@/domain/repositories/IExchangeRateRepository';
import { ExchangeRate } from '@/domain/entities/ExchangeRate';

export class GetAllExchangeRates {
  constructor(private exchangeRateRepository: IExchangeRateRepository) {}

  async execute(): Promise<ExchangeRate[]> {
    return this.exchangeRateRepository.findAll();
  }
}
