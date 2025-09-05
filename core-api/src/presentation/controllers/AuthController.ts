import { Login } from '@/use-cases/auth/Login';
import { Logout } from '@/use-cases/auth/Logout';
import { RefreshToken } from '@/use-cases/auth/RefreshToken';
import { Register } from '@/use-cases/auth/Register';
import { Request, Response } from 'express';
import { BaseController } from './BaseController';

export class AuthController extends BaseController {
  constructor(
    private login: Login,
    private register: Register,
    private refreshTokenUseCase: RefreshToken,
    private logout: Logout
  ) {
    super();
  }

  async loginUser(req: Request, res: Response) {
    return this.executeOperation(
      res,
      async () => {
        const { email, password } = req.body;

        if (!email || !password) {
          return this.badRequest(res, 'Email and password are required');
        }

        const result = await this.login.execute({ email, password });

        if (!result) {
          return this.unauthorized(res, 'Invalid email or password');
        }

        return this.ok(res, result);
      },
      'Error during login'
    );
  }

  async registerUser(req: Request, res: Response) {
    return this.executeOperation(
      res,
      async () => {
        const {
          identificationNumber,
          name,
          lastName,
          email,
          password,
          dateOfBirth,
        } = req.body;

        if (
          !identificationNumber ||
          !name ||
          !lastName ||
          !email ||
          !password ||
          !dateOfBirth
        ) {
          return this.badRequest(res, 'All fields are required');
        }

        const result = await this.register.execute({
          identificationNumber,
          name,
          lastName,
          email,
          password,
          dateOfBirth: new Date(dateOfBirth),
        });

        if (!result) {
          return this.conflict(res, 'User with this email already exists');
        }

        return this.created(res, result);
      },
      'Error during registration'
    );
  }

  async refreshToken(req: Request, res: Response) {
    return this.executeOperation(
      res,
      async () => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
          return this.badRequest(res, 'Refresh token is required');
        }

        const result = await this.refreshTokenUseCase.execute({ refreshToken });

        if (!result) {
          return this.unauthorized(res, 'Invalid refresh token');
        }

        return this.ok(res, result);
      },
      'Error during token refresh'
    );
  }

  async logoutUser(req: Request, res: Response) {
    return this.executeOperation(
      res,
      async () => {
        const { token } = req.body;

        if (!token) {
          return this.badRequest(res, 'Token is required');
        }

        const result = await this.logout.execute({ token });

        if (!result.success) {
          return this.badRequest(res, result.message);
        }

        return this.ok(res, result);
      },
      'Error during logout'
    );
  }
}
