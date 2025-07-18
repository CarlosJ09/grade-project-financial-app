import { BaseService } from '@/services/base';
import { PaymentMethod } from '@/types/financial';

class PaymentMethodService extends BaseService<PaymentMethod> {
  constructor() {
    super('/payment-methods');
  }
}

export const paymentMethodService = new PaymentMethodService();
