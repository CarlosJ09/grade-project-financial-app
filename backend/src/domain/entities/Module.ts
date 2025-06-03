class Module {
    constructor(
        public readonly id: string,
        public readonly courseId: string,
        public readonly contentItem: string,
        public readonly sequence: number,
        public readonly summary: string,
        public readonly estimatedMinutes: number,
        public readonly releaseAt: Date,
        public readonly prerequisiteModuleId?: string,
    ) { }
}

export { Module }; 