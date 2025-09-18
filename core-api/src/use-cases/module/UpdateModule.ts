import { Module } from '@/domain/entities/Module';
import { IModuleRepository } from '@/domain/repositories/IModuleRepository';

export type UpdateModuleInput = {
  courseId?: number;
  contentItem?: string;
  sequence?: number;
  summary?: string;
  estimatedMinutes?: number;
  releaseAt?: Date;
  prerequisiteModuleId?: number;
};

export class UpdateModule {
  constructor(private moduleRepository: IModuleRepository) {}

  async execute(id: number, input: UpdateModuleInput): Promise<Module> {
    return this.moduleRepository.update(id, input);
  }
}
