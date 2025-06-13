import { IBankingProductRepository } from "@/domain/repositories/IBankingProductRepository";
import { BankingProduct } from "@/domain/entities/BankingProduct";

export type CreateBankingProductInput = {
    bankingProductName: string;
};

export class CreateBankingProduct {
    constructor(private bankingProductRepository: IBankingProductRepository) { }

    async execute(input: CreateBankingProductInput): Promise<BankingProduct> {
        return this.bankingProductRepository.create(input);
    }
} 