import { Router } from 'express';
import { Database } from '@/infraestructure/config/Database';
import { PostgresUserRepository } from '@/infraestructure/repositories/PostgresUserRepository';
import { GetAllUsers } from '@/use-cases/user/GetAllUsers';
import { GetUserById } from '@/use-cases/user/GetUserById';
import { UserController } from '@/presentation/controllers/UserController';
import { JwtTokenService } from '@/infraestructure/services/JwtTokenService';
import { createAuthMiddleware } from '@/presentation/middleware/authMiddleware';
import { asyncHandler } from '@/presentation/utils/asyncHandler';

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const userRepository = new PostgresUserRepository(prisma);
const getAllUsers = new GetAllUsers(userRepository);
const getUserById = new GetUserById(userRepository);
const userController = new UserController(getAllUsers, getUserById);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/users',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return userController.getAll(req, res);
  })
);

/**
 * @swagger
 * /users/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the user to retrieve
 *   get:
 *     summary: Get a user by id
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A user
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get(
  '/users/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return userController.getById(req, res);
  })
);

export { router as userRoutes };
