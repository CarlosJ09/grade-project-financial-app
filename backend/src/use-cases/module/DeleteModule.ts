import { IModuleRepository } from '@/domain/repositories/IModuleRepository';

export class DeleteModule {
  constructor(private moduleRepository: IModuleRepository) {}

  async execute(id: string): Promise<boolean> {
    try {
      await this.moduleRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
