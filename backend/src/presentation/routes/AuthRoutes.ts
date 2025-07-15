import { Database } from '@/infraestructure/config/Database';
import { PostgresUserRepository } from '@/infraestructure/repositories/PostgresUserRepository';
import { BcryptPasswordService } from '@/infraestructure/services/BcryptPasswordService';
import { JwtTokenService } from '@/infraestructure/services/JwtTokenService';
import { AuthController } from '@/presentation/controllers/AuthController';
import { asyncHandler } from '@/presentation/utils/asyncHandler';
import { Login } from '@/use-cases/auth/Login';
import { Logout } from '@/use-cases/auth/Logout';
import { RefreshToken } from '@/use-cases/auth/RefreshToken';
import { Register } from '@/use-cases/auth/Register';
import { Router } from 'express';

const router = Router();

const prisma = Database.getInstance();
const userRepository = new PostgresUserRepository(prisma);
const passwordService = new BcryptPasswordService();
const tokenService = new JwtTokenService();
const login = new Login(userRepository, passwordService, tokenService);
const register = new Register(userRepository, passwordService, tokenService);
const refreshToken = new RefreshToken(userRepository, tokenService);
const logout = new Logout(tokenService);
const authController = new AuthController(
  login,
  register,
  refreshToken,
  logout
);

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
 *                 expiresAt:
 *                   type: string
 *                   format: date-time
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     identificationNumber:
 *                       type: string
 *                     email:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     birthDate:
 *                       type: string
 *                       format: date-time
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
 *               - identificationNumber
 *               - name
 *               - lastName
 *               - email
 *               - password
 *               - dateOfBirth
 *             properties:
 *               identificationNumber:
 *                 type: string
 *                 example: "1234567890"
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
 *                 expiresAt:
 *                   type: string
 *                   format: date-time
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

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 expiresAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Invalid refresh token
 *       400:
 *         description: Bad request
 */
router.post(
  '/auth/refresh',
  asyncHandler(async (req, res) => {
    return authController.refreshToken(req, res);
  })
);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 */
router.post(
  '/auth/logout',
  asyncHandler(async (req, res) => {
    return authController.logoutUser(req, res);
  })
);

export { router as authRoutes };
