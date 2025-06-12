import { IBudgetRepository } from "@/domain/repositories/IBudgetRepository";
import { Budget } from "@/domain/entities/Budget";

export class GetAllBudgets {
    constructor(private budgetRepository: IBudgetRepository) { }

    async execute(): Promise<Budget[]> {
        return this.budgetRepository.findAll();
    }
} 