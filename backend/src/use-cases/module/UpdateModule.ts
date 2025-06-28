import { IModuleRepository } from '@/domain/repositories/IModuleRepository';
import { Module } from '@/domain/entities/Module';

export type UpdateModuleInput = {
  courseId?: string;
  contentItem?: string;
  sequence?: number;
  summary?: string;
  estimatedMinutes?: number;
  releaseAt?: Date;
  prerequisiteModuleId?: string;
};

export class UpdateModule {
  constructor(private moduleRepository: IModuleRepository) {}

  async execute(id: string, input: UpdateModuleInput): Promise<Module> {
    return this.moduleRepository.update(id, input);
  }
}
