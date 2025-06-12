import { ICurrencyRepository } from "@/domain/repositories/ICurrencyRepository";
import { Currency } from "@/domain/entities/Currency";

export class GetAllCurrencies {
    constructor(private currencyRepository: ICurrencyRepository) { }

    async execute(): Promise<Currency[]> {
        return this.currencyRepository.findAll();
    }
} 