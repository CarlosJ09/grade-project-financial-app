import { IBaseRepository } from '@/domain/repositories/IBaseRepository';

export class GetEntityById<T> {
    constructor(private repository: IBaseRepository<T>) {}
    
    async execute(id: string): Promise<T | null> {
        return this.repository.findById(id);
    }
}
