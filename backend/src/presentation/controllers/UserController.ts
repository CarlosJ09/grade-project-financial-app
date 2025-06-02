import { Request, Response } from 'express';
import { GetAllUsers } from '@/use-cases/user/GetAllUsers';
import { GetUserById } from '@/use-cases/user/GetUserById';
import { UserResponseDto } from '@/presentation/dtos/response/UserResponseDto';

export class UserController {
    constructor(private getAllUsers: GetAllUsers, private getUserById: GetUserById) { }

    async getAll(req: Request, res: Response) {
        const users = await this.getAllUsers.execute();
        const userDtos = users.map(UserResponseDto.fromEntity);
        res.json(userDtos);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const user = await this.getUserById.execute(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userDto = UserResponseDto.fromEntity(user);
        res.json(userDto);
    }
}