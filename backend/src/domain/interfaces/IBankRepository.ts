import { Bank } from "@/domain/entities/Bank";

export interface IBankRepository {
    findAll(): Promise<Bank[]>;
    findById(id: string): Promise<Bank | null>;
    create(bank: Bank): Promise<Bank>;
    update(bank: Bank): Promise<Bank>;
    delete(id: string): Promise<void>;
}
