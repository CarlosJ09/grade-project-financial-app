import { IExchangeRateRepository } from "@/domain/repositories/IExchangeRateRepository";
import { ExchangeRate } from "@/domain/entities/ExchangeRate";

export class GetExchangeRateById {
    constructor(private exchangeRateRepository: IExchangeRateRepository) { }

    async execute(id: string): Promise<ExchangeRate | null> {
        return this.exchangeRateRepository.findById(id);
    }
} 