import { IBaseRepository } from '@/domain/interfaces/IBaseRepository';

export class GetEntityById<T> {
    constructor(private repository: IBaseRepository<T>) {}
    
    async execute(id: string): Promise<T | null> {
        return this.repository.findById(id);
    }
}
