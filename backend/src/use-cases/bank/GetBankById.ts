import { IBankRepository } from "@/domain/interfaces/IBankRepository";
import { Bank } from "@/domain/entities/Bank";

export class GetBankById {
    constructor(private bankRepository: IBankRepository) { }

    async execute(id: string): Promise<Bank | null> {
        return this.bankRepository.findById(id);
    }
}   