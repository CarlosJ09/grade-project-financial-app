import { IModuleRepository } from '@/domain/repositories/IModuleRepository';
import { Module } from '@/domain/entities/Module';

export class GetAllModules {
  constructor(private moduleRepository: IModuleRepository) {}

  async execute(): Promise<Module[]> {
    return this.moduleRepository.findAll();
  }
}
