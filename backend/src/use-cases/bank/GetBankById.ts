import { BankRepository } from "@/domain/interfaces/BankRepository";
import { Bank } from "@/domain/entities/Bank";

export class GetBankById {
    constructor(private bankRepository: BankRepository) { }

    async execute(id: string): Promise<Bank | null> {
        return this.bankRepository.findById(id);
    }
}   