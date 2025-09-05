import { ICurrencyRepository } from '@/domain/repositories/ICurrencyRepository';
import { Currency } from '@/domain/entities/Currency';

export class GetCurrencyById {
  constructor(private currencyRepository: ICurrencyRepository) {}

  async execute(id: string): Promise<Currency | null> {
    return this.currencyRepository.findById(id);
  }
}
