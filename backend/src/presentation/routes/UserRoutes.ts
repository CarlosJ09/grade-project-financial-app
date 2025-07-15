import { Database } from '@/infraestructure/config/Database';
import { PostgresCurrencyRepository } from '@/infraestructure/repositories/PostgresCurrencyRepository';
import { PostgresExchangeRateRepository } from '@/infraestructure/repositories/PostgresExchangeRateRepository';
import { PostgresTransactionRepository } from '@/infraestructure/repositories/PostgresTransactionRepository';
import { PostgresUserRepository } from '@/infraestructure/repositories/PostgresUserRepository';
import { JwtTokenService } from '@/infraestructure/services/JwtTokenService';
import { UserController } from '@/presentation/controllers/UserController';
import { createAuthMiddleware } from '@/presentation/middleware/authMiddleware';
import { asyncHandler } from '@/presentation/utils/asyncHandler';
import { GetAllUsers } from '@/use-cases/user/GetAllUsers';
import { GetUserBalance } from '@/use-cases/user/GetUserBalance';
import { GetUserById } from '@/use-cases/user/GetUserById';
import { Router } from 'express';

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const userRepository = new PostgresUserRepository(prisma);
const transactionRepository = new PostgresTransactionRepository(prisma);
const currencyRepository = new PostgresCurrencyRepository(prisma);
const exchangeRateRepository = new PostgresExchangeRateRepository(prisma);

const getAllUsers = new GetAllUsers(userRepository);
const getUserById = new GetUserById(userRepository);
const getUserBalance = new GetUserBalance(
  transactionRepository,
  currencyRepository,
  exchangeRateRepository
);

const userController = new UserController(
  getAllUsers,
  getUserById,
  getUserBalance
);

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

/**
 * @swagger
 * /users/{id}/balance:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the user to get balance for
 *   get:
 *     summary: Get user's current balance
 *     description: Calculate and return the user's current balance, including income, expenses, and balance by currency
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: baseCurrencyId
 *         schema:
 *           type: integer
 *         description: Currency ID to convert all amounts to (optional)
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for transaction filtering (optional)
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for transaction filtering (optional)
 *     responses:
 *       200:
 *         description: User balance information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalBalance:
 *                       type: number
 *                       example: 1250.50
 *                     totalIncome:
 *                       type: number
 *                       example: 5000.00
 *                     totalExpenses:
 *                       type: number
 *                       example: 3749.50
 *                     baseCurrency:
 *                       type: string
 *                       example: "USD"
 *                     balancesByCurrency:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           currency:
 *                             type: string
 *                             example: "USD"
 *                           balance:
 *                             type: number
 *                             example: 1250.50
 *                           income:
 *                             type: number
 *                             example: 5000.00
 *                           expenses:
 *                             type: number
 *                             example: 3749.50
 *                     lastTransactionDate:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       example: "2024-01-15T10:30:00Z"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get(
  '/users/:id/balance',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return userController.getBalance(req, res);
  })
);

export { router as userRoutes };
