import { Router } from 'express';
import { Database } from '@/infraestructure/config/Database';
import { PostgresUserRepository } from '@/infraestructure/repositories/PostgresUserRepository';
import { BcryptPasswordService } from '@/infraestructure/services/BcryptPasswordService';
import { JwtTokenService } from '@/infraestructure/services/JwtTokenService';
import { Login } from '@/use-cases/auth/Login';
import { Register } from '@/use-cases/auth/Register';
import { AuthController } from '@/presentation/controllers/AuthController';
import { asyncHandler } from '@/presentation/utils/asyncHandler';

const router = Router();

const prisma = Database.getInstance();
const userRepository = new PostgresUserRepository(prisma);
const passwordService = new BcryptPasswordService();
const tokenService = new JwtTokenService();
const login = new Login(userRepository, passwordService, tokenService);
const register = new Register(userRepository, passwordService, tokenService);
const authController = new AuthController(login, register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Bad request
 */
router.post(
  '/auth/login',
  asyncHandler(async (req, res) => {
    return authController.loginUser(req, res);
  })
);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastName
 *               - email
 *               - password
 *               - dateOfBirth
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       409:
 *         description: User already exists
 *       400:
 *         description: Bad request
 */
router.post(
  '/auth/register',
  asyncHandler(async (req, res) => {
    return authController.registerUser(req, res);
  })
);

export { router as authRoutes };
