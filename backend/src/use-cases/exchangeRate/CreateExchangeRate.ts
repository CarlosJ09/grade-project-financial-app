import { IExchangeRateRepository } from "@/domain/repositories/IExchangeRateRepository";
import { ExchangeRate } from "@/domain/entities/ExchangeRate";

export type CreateExchangeRateInput = {
    currencyId: string;
    rate: number;
    rateDate: Date;
};

export class CreateExchangeRate {
    constructor(private exchangeRateRepository: IExchangeRateRepository) { }

    async execute(input: CreateExchangeRateInput): Promise<ExchangeRate> {
        return this.exchangeRateRepository.create(input);
    }
} 