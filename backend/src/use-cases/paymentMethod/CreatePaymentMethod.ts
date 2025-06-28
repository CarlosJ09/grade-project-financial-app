import { IPaymentMethodRepository } from '@/domain/repositories/IPaymentMethodRepository';
import { PaymentMethod } from '@/domain/entities/PaymentMethod';

export type CreatePaymentMethodInput = {
  paymentMethod: string;
};

export class CreatePaymentMethod {
  constructor(private paymentMethodRepository: IPaymentMethodRepository) {}

  async execute(input: CreatePaymentMethodInput): Promise<PaymentMethod> {
    return this.paymentMethodRepository.create(input);
  }
}
