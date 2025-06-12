import { ITransactionRepository } from "@/domain/repositories/ITransactionRepository";

export class DeleteTransaction {
    constructor(private transactionRepository: ITransactionRepository) { }

    async execute(id: string): Promise<boolean> {
        try {
            await this.transactionRepository.delete(id);
            return true;
        } catch (error) {
            return false;
        }
    }
} 