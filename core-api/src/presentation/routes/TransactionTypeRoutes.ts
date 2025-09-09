import { Database } from '@/infraestructure/config/Database';
import { PostgresTransactionTypeRepository } from '@/infraestructure/repositories/PostgresTransactionTypeRepository';
import { JwtTokenService } from '@/infraestructure/services/JwtTokenService';
import { TransactionTypeController } from '@/presentation/controllers/TransactionTypeController';
import { createAuthMiddleware } from '@/presentation/middleware/authMiddleware';
import { asyncHandler } from '@/presentation/utils/asyncHandler';
import { GetAllTransactionTypes } from '@/use-cases/transactionType/GetAllTransactionTypes';
import { GetTransactionTypeById } from '@/use-cases/transactionType/GetTransactionTypeById';
import { Router } from 'express';

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const transactionTypeRepository = new PostgresTransactionTypeRepository(prisma);
const getAllTransactionTypes = new GetAllTransactionTypes(
  transactionTypeRepository
);
const getTransactionTypeById = new GetTransactionTypeById(
  transactionTypeRepository
);
const transactionTypeController = new TransactionTypeController(
  getAllTransactionTypes,
  getTransactionTypeById
);

/**
 * @swagger
 * /transaction-types:
 *   get:
 *     summary: Get all transaction types
 *     tags: [Transaction Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of transaction types
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Income"
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/transaction-types',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return transactionTypeController.getAll(req, res);
  })
);

/**
 * @swagger
 * /transaction-types/{id}:
 *   get:
 *     summary: Get a transaction type by id
 *     tags: [Transaction Types]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the transaction type to retrieve
 *     responses:
 *       200:
 *         description: A transaction type
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction type not found
 */
router.get(
  '/transaction-types/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return transactionTypeController.getById(req, res);
  })
);

export { router as transactionTypeRoutes };
