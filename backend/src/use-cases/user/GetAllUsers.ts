import { IUserRepository } from "@/domain/interfaces/IUserRepository";
import { User } from "@/domain/entities/User";

export class GetAllUsers {
    constructor(private userRepository: IUserRepository) {}
    
    async execute(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}