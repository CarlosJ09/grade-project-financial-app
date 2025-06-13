import { Module } from "@/domain/entities/Module";

export class ModuleResponseDto {
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

    static fromEntity(module: Module): ModuleResponseDto {
        return new ModuleResponseDto(
            module.id,
            module.courseId,
            module.contentItem,
            module.sequence,
            module.summary,
            module.estimatedMinutes,
            module.releaseAt,
            module.prerequisiteModuleId,
        );
    }
} 