import { Database } from '@/infraestructure/config/Database';
import { PostgresBudgetTypeRepository } from '@/infraestructure/repositories/PostgresBudgetTypeRepository';
import { JwtTokenService } from '@/infraestructure/services/JwtTokenService';
import { BudgetTypeController } from '@/presentation/controllers/BudgetTypeController';
import { createAuthMiddleware } from '@/presentation/middleware/authMiddleware';
import { asyncHandler } from '@/presentation/utils/asyncHandler';
import { GetAllBudgetTypes } from '@/use-cases/budgetType/GetAllBudgetTypes';
import { GetBudgetTypeById } from '@/use-cases/budgetType/GetBudgetTypeById';
import { Router } from 'express';

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const budgetTypeRepository = new PostgresBudgetTypeRepository(prisma);
const getAllBudgetTypes = new GetAllBudgetTypes(budgetTypeRepository);
const getBudgetTypeById = new GetBudgetTypeById(budgetTypeRepository);
const budgetTypeController = new BudgetTypeController(
  getAllBudgetTypes,
  getBudgetTypeById
);

/**
 * @swagger
 * /budget-types:
 *   get:
 *     summary: Get all budget types
 *     tags: [Budget Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of budget types
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
 *                         example: "Savings"
 *                       description:
 *                         type: string
 *                         example: "Accumulating money toward a specific goal or target amount"
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/budget-types',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return budgetTypeController.getAll(req, res);
  })
);

/**
 * @swagger
 * /budget-types/{id}:
 *   get:
 *     summary: Get a budget type by id
 *     tags: [Budget Types]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the budget type to retrieve
 *     responses:
 *       200:
 *         description: A budget type
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Budget type not found
 */
router.get(
  '/budget-types/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return budgetTypeController.getById(req, res);
  })
);

export { router as budgetTypeRoutes };
