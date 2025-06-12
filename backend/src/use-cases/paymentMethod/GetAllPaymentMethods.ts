import { IPaymentMethodRepository } from "@/domain/repositories/IPaymentMethodRepository";
import { PaymentMethod } from "@/domain/entities/PaymentMethod";

export class GetAllPaymentMethods {
    constructor(private paymentMethodRepository: IPaymentMethodRepository) { }

    async execute(): Promise<PaymentMethod[]> {
        return this.paymentMethodRepository.findAll();
    }
} 