import { Database } from '@/infraestructure/config/Database';
import { PostgresTransactionCategoryRepository } from '@/infraestructure/repositories/PostgresTransactionCategoryRepository';
import { JwtTokenService } from '@/infraestructure/services/JwtTokenService';
import { TransactionCategoryController } from '@/presentation/controllers/TransactionCategoryController';
import { createAuthMiddleware } from '@/presentation/middleware/authMiddleware';
import { asyncHandler } from '@/presentation/utils/asyncHandler';
import { GetAllTransactionCategories } from '@/use-cases/transactionCategory/GetAllTransactionCategories';
import { GetTransactionCategoryById } from '@/use-cases/transactionCategory/GetTransactionCategoryById';
import { Router } from 'express';

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const transactionCategoryRepository = new PostgresTransactionCategoryRepository(
  prisma
);
const getAllTransactionCategories = new GetAllTransactionCategories(
  transactionCategoryRepository
);
const getTransactionCategoryById = new GetTransactionCategoryById(
  transactionCategoryRepository
);
const transactionCategoryController = new TransactionCategoryController(
  getAllTransactionCategories,
  getTransactionCategoryById
);

/**
 * @swagger
 * /transaction-categories:
 *   get:
 *     summary: Get all transaction categories
 *     tags: [Transaction Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of transaction categories
 *         content:
 *           application/json:
 *             schema:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Food & Dining"
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/transaction-categories',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return transactionCategoryController.getAll(req, res);
  })
);

/**
 * @swagger
 * /transaction-categories/{id}:
 *   get:
 *     summary: Get a transaction category by id
 *     tags: [Transaction Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the transaction category to retrieve
 *     responses:
 *       200:
 *         description: A transaction category
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction category not found
 */
router.get(
  '/transaction-categories/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return transactionCategoryController.getById(req, res);
  })
);

export { router as transactionCategoryRoutes };
