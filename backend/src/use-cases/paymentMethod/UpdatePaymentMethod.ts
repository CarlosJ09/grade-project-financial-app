import { IPaymentMethodRepository } from "@/domain/repositories/IPaymentMethodRepository";
import { PaymentMethod } from "@/domain/entities/PaymentMethod";

export type UpdatePaymentMethodInput = {
    paymentMethod?: string;
};

export class UpdatePaymentMethod {
    constructor(private paymentMethodRepository: IPaymentMethodRepository) { }

    async execute(id: string, input: UpdatePaymentMethodInput): Promise<PaymentMethod> {
        return this.paymentMethodRepository.update(id, input);
    }
} 