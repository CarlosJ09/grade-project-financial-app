import { PaymentMethod } from '@/domain/entities/PaymentMethod';
import { IBaseRepository } from './IBaseRepository';

export interface IPaymentMethodRepository
  extends IBaseRepository<PaymentMethod> {}
