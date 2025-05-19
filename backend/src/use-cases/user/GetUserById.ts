import { UserRepository } from "@/domain/interfaces/UserRepository";
import { User } from "@/domain/entities/User";

export class GetUserById {
    constructor(private userRepository: UserRepository) { }

    async execute(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }
}