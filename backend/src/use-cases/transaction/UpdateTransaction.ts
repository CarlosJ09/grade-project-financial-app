import { ITransactionRepository } from "@/domain/repositories/ITransactionRepository";
import { Transaction } from "@/domain/entities/Transaction";

export type UpdateTransactionInput = {
    amount?: number;
    currencyId?: string;
    exchangeRateId?: string;
    type?: string;
    categoryId?: string;
    paymentMethodId?: string;
    place?: string;
    bankingProductId?: string;
    transactionDate?: Date;
};

export class UpdateTransaction {
    constructor(private transactionRepository: ITransactionRepository) { }

    async execute(id: string, input: UpdateTransactionInput): Promise<Transaction> {
        const updateData: any = { ...input };
        
        // Handle nullable fields properly
        if (input.exchangeRateId !== undefined) {
            updateData.exchangeRateId = input.exchangeRateId || null;
        }
        if (input.bankingProductId !== undefined) {
            updateData.bankingProductId = input.bankingProductId || null;
        }
        
        return this.transactionRepository.update(id, updateData);
    }
} 