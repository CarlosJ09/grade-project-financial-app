import { IUserBankRepository } from "@/domain/repositories/IUserBankRepository";

export class DeleteUserBank {
    constructor(private userBankRepository: IUserBankRepository) { }

    async execute(id: string): Promise<boolean> {
        try {
            await this.userBankRepository.delete(id);
            return true;
        } catch (error) {
            return false;
        }
    }
} 