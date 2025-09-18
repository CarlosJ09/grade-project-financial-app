import { Module } from '@/domain/entities/Module';
import { IModuleRepository } from '@/domain/repositories/IModuleRepository';

export class GetModulesByCourseId {
  constructor(private moduleRepository: IModuleRepository) {}

  async execute(courseId: number): Promise<Module[]> {
    return this.moduleRepository.findByCourseId(courseId);
  }
}
