import { BaseService } from '@/services/base';
import { Currency } from '@/types/financial';

class CurrencyService extends BaseService<Currency> {
  constructor() {
    super('/currencies');
  }
}

export const currencyService = new CurrencyService();
