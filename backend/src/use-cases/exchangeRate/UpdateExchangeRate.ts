import { IExchangeRateRepository } from "@/domain/repositories/IExchangeRateRepository";
import { ExchangeRate } from "@/domain/entities/ExchangeRate";

export type UpdateExchangeRateInput = {
    currencyId?: string;
    rate?: number;
    rateDate?: Date;
};

export class UpdateExchangeRate {
    constructor(private exchangeRateRepository: IExchangeRateRepository) { }

    async execute(id: string, input: UpdateExchangeRateInput): Promise<ExchangeRate> {
        return this.exchangeRateRepository.update(id, input);
    }
} 