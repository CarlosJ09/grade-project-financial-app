import { BaseService } from '@/services/base';
import { Merchant } from '@/types/financial/transaction';

class MerchantService extends BaseService<Merchant> {
  constructor() {
    super('/merchants');
  }
}

export const merchantService = new MerchantService();
