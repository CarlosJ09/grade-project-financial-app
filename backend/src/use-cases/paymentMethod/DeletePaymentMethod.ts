import { IPaymentMethodRepository } from '@/domain/repositories/IPaymentMethodRepository';

export class DeletePaymentMethod {
  constructor(private paymentMethodRepository: IPaymentMethodRepository) {}

  async execute(id: string): Promise<boolean> {
    try {
      await this.paymentMethodRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
