import { IUserBankRepository } from "@/domain/repositories/IUserBankRepository";
import { UserBank } from "@/domain/entities/UserBank";

export type UpdateUserBankInput = {
    alias?: string;
    lastSyncAt?: Date;
};

export class UpdateUserBank {
    constructor(private userBankRepository: IUserBankRepository) { }

    async execute(id: string, input: UpdateUserBankInput): Promise<UserBank> {
        return this.userBankRepository.update(id, input);
    }
} 