import { IBankRepository } from "@/domain/interfaces/IBankRepository";
import { Bank } from "@/domain/entities/Bank";

export type CreateBankInput = {
    name: string;
};

export class CreateBank {
    constructor(private bankRepository: IBankRepository) { }

    async execute(input: CreateBankInput): Promise<Bank> {
        return this.bankRepository.create(input);
    }
} 