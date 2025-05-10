import { Request, Response } from 'express';
import { GetAllUsers } from '@/use-cases/user/GetAllUsers';

export class UserController {
    constructor(private getAllUsers: GetAllUsers) { }

    async getAll(req: Request, res: Response) {
        const users = await this.getAllUsers.execute();
        res.json(users);
    }
}