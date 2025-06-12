import { IUserBankRepository } from "@/domain/repositories/IUserBankRepository";
import { UserBank } from "@/domain/entities/UserBank";

export class GetAllUserBanks {
    constructor(private userBankRepository: IUserBankRepository) { }

    async execute(): Promise<UserBank[]> {
        return this.userBankRepository.findAll();
    }
} 