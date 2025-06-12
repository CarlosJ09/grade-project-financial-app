import { Request, Response } from 'express';
import { Login } from '@/use-cases/auth/Login';
import { Register } from '@/use-cases/auth/Register';
import { BaseController } from './BaseController';

export class AuthController extends BaseController {
    constructor(
        private login: Login,
        private register: Register
    ) {
        super();
    }

    async loginUser(req: Request, res: Response) {
        return this.executeOperation(res, async () => {
            const { email, password } = req.body;

            if (!email || !password) {
                return this.badRequest(res, 'Email and password are required');
            }

            const result = await this.login.execute({ email, password });

            if (!result) {
                return this.unauthorized(res, 'Invalid email or password');
            }

            return this.ok(res, result);
        }, 'Error during login');
    }

    async registerUser(req: Request, res: Response) {
        return this.executeOperation(res, async () => {
            const { name, lastName, email, password, dateOfBirth } = req.body;

            if (!name || !lastName || !email || !password || !dateOfBirth) {
                return this.badRequest(res, 'All fields are required');
            }

            const result = await this.register.execute({
                name,
                lastName,
                email,
                password,
                dateOfBirth: new Date(dateOfBirth)
            });

            if (!result) {
                return this.conflict(res, 'User with this email already exists');
            }

            return this.created(res, result);
        }, 'Error during registration');
    }
} 