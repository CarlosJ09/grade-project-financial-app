import { BaseService } from '@/services/base';
import { Currency } from '@/types/financial/shared';

class CurrencyService extends BaseService<Currency> {
  constructor() {
    super('/currencies');
  }
}

export const currencyService = new CurrencyService();
