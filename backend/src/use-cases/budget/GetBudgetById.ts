import { IBudgetRepository } from "@/domain/repositories/IBudgetRepository";
import { Budget } from "@/domain/entities/Budget";

export class GetBudgetById {
    constructor(private budgetRepository: IBudgetRepository) { }

    async execute(id: string): Promise<Budget | null> {
        return this.budgetRepository.findById(id);
    }
} 