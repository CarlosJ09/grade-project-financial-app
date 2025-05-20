class Budget {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly currentAmount: number,
        public readonly goalAmount: number,
        public readonly startDate: Date,
        public readonly endDate: Date,
        public readonly state: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) { }
}

export { Budget };