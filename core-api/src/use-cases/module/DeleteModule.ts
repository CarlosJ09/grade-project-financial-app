import { IModuleRepository } from '@/domain/repositories/IModuleRepository';

export class DeleteModule {
  constructor(private moduleRepository: IModuleRepository) {}

  async execute(id: number): Promise<boolean> {
    try {
      await this.moduleRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
