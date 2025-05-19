import { BankRepository } from "@/domain/interfaces/BankRepository";
import { Bank } from "@/domain/entities/Bank";

export class GetAllBanks {
    constructor(private bankRepository: BankRepository) {}
    
    async execute(): Promise<Bank[]> {
        return this.bankRepository.findAll();
    }
}