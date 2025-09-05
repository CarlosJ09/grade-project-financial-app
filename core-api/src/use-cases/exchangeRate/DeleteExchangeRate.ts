import { IExchangeRateRepository } from '@/domain/repositories/IExchangeRateRepository';

export class DeleteExchangeRate {
  constructor(private exchangeRateRepository: IExchangeRateRepository) {}

  async execute(id: string): Promise<boolean> {
    try {
      await this.exchangeRateRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
