import { IPaymentMethodRepository } from "@/domain/repositories/IPaymentMethodRepository";
import { PaymentMethod } from "@/domain/entities/PaymentMethod";

export class GetPaymentMethodById {
    constructor(private paymentMethodRepository: IPaymentMethodRepository) { }

    async execute(id: string): Promise<PaymentMethod | null> {
        return this.paymentMethodRepository.findById(id);
    }
} 