import { IBudgetRepository } from "@/domain/repositories/IBudgetRepository";
import { Budget } from "@/domain/entities/Budget";

export type UpdateBudgetInput = {
    name?: string;
    description?: string;
    currentAmount?: number;
    goalAmount?: number;
    currencyId?: string;
    startDate?: Date;
    finishedDate?: Date;
    state?: string;
};

export class UpdateBudget {
    constructor(private budgetRepository: IBudgetRepository) { }

    async execute(id: string, input: UpdateBudgetInput): Promise<Budget> {
        return this.budgetRepository.update(id, input);
    }
} 