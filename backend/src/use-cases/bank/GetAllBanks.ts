import { IBankRepository } from "@/domain/interfaces/IBankRepository";
import { Bank } from "@/domain/entities/Bank";

export class GetAllBanks {
    constructor(private bankRepository: IBankRepository) { }

    async execute(): Promise<Bank[]> {
        return this.bankRepository.findAll();
    }
}