import { User } from "@/domain/entities/User";
import { IBaseRepository } from "./IBaseRepository";

export interface IUserRepository extends IBaseRepository<User> {

}
