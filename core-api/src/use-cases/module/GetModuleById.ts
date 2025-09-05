import { IModuleRepository } from '@/domain/repositories/IModuleRepository';
import { Module } from '@/domain/entities/Module';

export class GetModuleById {
  constructor(private moduleRepository: IModuleRepository) {}

  async execute(id: string): Promise<Module | null> {
    return this.moduleRepository.findById(id);
  }
}
