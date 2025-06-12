import { Currency } from "@/domain/entities/Currency";

export interface ICurrencyRepository {
    findAll(): Promise<Currency[]>;
    findById(id: string): Promise<Currency | null>;
} 