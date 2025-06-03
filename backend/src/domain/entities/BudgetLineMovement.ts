class BudgetLineMovement {
    constructor(
        public readonly id: string,
        public readonly budgetId: string,
        public readonly transactionId: string,
        public readonly movementType: string, // allocation, actual
        public readonly amount: number,
        public readonly dateMovement: Date,
    ) { }
}

export { BudgetLineMovement }; 