import { User } from "@/domain/entities/User";

export interface IUserRepository {
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
}
