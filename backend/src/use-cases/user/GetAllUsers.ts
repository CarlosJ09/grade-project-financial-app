import { UserRepository } from "@/domain/interfaces/UserRepository";
import { User } from "@/domain/entities/User";

export class GetAllUsers {
    constructor(private readonly userRepository: UserRepository) {}
    
    async execute(): Promise<User[]> {
        return this.userRepository.findAll();
    }
}

