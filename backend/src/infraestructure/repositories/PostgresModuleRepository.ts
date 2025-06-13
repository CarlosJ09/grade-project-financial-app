import { Module } from "@/domain/entities/Module";
import { IModuleRepository } from "@/domain/repositories/IModuleRepository";
import { PrismaClient } from "@/infraestructure/prisma/generated/prisma";

export class PostgresModuleRepository implements IModuleRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async findAll(): Promise<Module[]> {
        const modules = await this.prisma.module.findMany();
        return modules.map(module => new Module(
            module.id,
            module.courseId,
            module.contentItem,
            module.sequence,
            module.summary,
            module.estimatedMinutes,
            module.releaseAt,
            module.prerequisiteModuleId || undefined
        ));
    }

    async findById(id: string): Promise<Module | null> {
        const module = await this.prisma.module.findUnique({
            where: { id }
        });
        
        if (!module) return null;
        
        return new Module(
            module.id,
            module.courseId,
            module.contentItem,
            module.sequence,
            module.summary,
            module.estimatedMinutes,
            module.releaseAt,
            module.prerequisiteModuleId || undefined
        );
    }

    async create(entity: Omit<Module, 'id'>): Promise<Module> {
        const module = await this.prisma.module.create({
            data: {
                ...entity,
                prerequisiteModuleId: entity.prerequisiteModuleId || null
            }
        });
        
        return new Module(
            module.id,
            module.courseId,
            module.contentItem,
            module.sequence,
            module.summary,
            module.estimatedMinutes,
            module.releaseAt,
            module.prerequisiteModuleId || undefined
        );
    }

    async update(id: string, entity: Partial<Omit<Module, 'id'>>): Promise<Module> {
        const updateData: any = { ...entity };
        
        // Handle nullable prerequisiteModuleId properly
        if (entity.prerequisiteModuleId !== undefined) {
            updateData.prerequisiteModuleId = entity.prerequisiteModuleId || null;
        }
        
        const module = await this.prisma.module.update({
            where: { id },
            data: updateData
        });
        
        return new Module(
            module.id,
            module.courseId,
            module.contentItem,
            module.sequence,
            module.summary,
            module.estimatedMinutes,
            module.releaseAt,
            module.prerequisiteModuleId || undefined
        );
    }

    async delete(id: string): Promise<void> {
        await this.prisma.module.delete({
            where: { id }
        });
    }
} 