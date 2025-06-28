import { IModuleRepository } from '@/domain/repositories/IModuleRepository';
import { Module } from '@/domain/entities/Module';

export type CreateModuleInput = {
  courseId: string;
  contentItem: string;
  sequence: number;
  summary: string;
  estimatedMinutes: number;
  releaseAt: Date;
  prerequisiteModuleId?: string;
};

export class CreateModule {
  constructor(private moduleRepository: IModuleRepository) {}

  async execute(input: CreateModuleInput): Promise<Module> {
    return this.moduleRepository.create(input);
  }
}
