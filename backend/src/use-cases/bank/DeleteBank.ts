import { IBankRepository } from "@/domain/repositories/IBankRepository";

export class DeleteBank {
    constructor(private bankRepository: IBankRepository) { }

    async execute(id: string): Promise<boolean> {
        try {
            await this.bankRepository.delete(id);
            return true;
        } catch (error) {
            return false;
        }
    }
} 