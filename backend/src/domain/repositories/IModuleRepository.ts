import { Module } from '@/domain/entities/Module';
import { IBaseRepository } from './IBaseRepository';

export interface IModuleRepository extends IBaseRepository<Module> {}
