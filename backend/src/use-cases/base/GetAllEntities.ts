import { IBaseRepository } from '@/domain/repositories/IBaseRepository';

export class GetAllEntities<T> {
  constructor(private repository: IBaseRepository<T>) {}

  async execute(): Promise<T[]> {
    return this.repository.findAll();
  }
}
