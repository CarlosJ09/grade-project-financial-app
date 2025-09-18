import { Module } from '@/domain/entities/Module';
import { IModuleRepository } from '@/domain/repositories/IModuleRepository';

export type CreateModuleInput = {
  courseId: number;
  contentItem: string;
  sequence: number;
  summary: string;
  estimatedMinutes: number;
  releaseAt: Date;
  prerequisiteModuleId?: number;
};

export class CreateModule {
  constructor(private moduleRepository: IModuleRepository) {}

  async execute(input: CreateModuleInput): Promise<Module> {
    return this.moduleRepository.create(input);
  }
}
