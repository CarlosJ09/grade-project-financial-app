import { Database } from '@/infraestructure/config/Database';
import { PostgresBudgetStatusRepository } from '@/infraestructure/repositories/PostgresBudgetStatusRepository';
import { JwtTokenService } from '@/infraestructure/services/JwtTokenService';
import { BudgetStatusController } from '@/presentation/controllers/BudgetStatusController';
import { createAuthMiddleware } from '@/presentation/middleware/authMiddleware';
import { asyncHandler } from '@/presentation/utils/asyncHandler';
import { GetAllBudgetStatuses } from '@/use-cases/budgetStatus/GetAllBudgetStatuses';
import { GetBudgetStatusById } from '@/use-cases/budgetStatus/GetBudgetStatusById';
import { Router } from 'express';

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const budgetStatusRepository = new PostgresBudgetStatusRepository(prisma);
const getAllBudgetStatuses = new GetAllBudgetStatuses(budgetStatusRepository);
const getBudgetStatusById = new GetBudgetStatusById(budgetStatusRepository);
const budgetStatusController = new BudgetStatusController(
  getAllBudgetStatuses,
  getBudgetStatusById
);

/**
 * @swagger
 * /budget-statuses:
 *   get:
 *     summary: Get all budget statuses
 *     tags: [Budget Statuses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of budget statuses
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
 *                         example: "active"
 *                       description:
 *                         type: string
 *                         example: "Budget is currently active"
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/budget-statuses',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return budgetStatusController.getAll(req, res);
  })
);

/**
 * @swagger
 * /budget-statuses/{id}:
 *   get:
 *     summary: Get a budget status by id
 *     tags: [Budget Statuses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the budget status to retrieve
 *     responses:
 *       200:
 *         description: A budget status
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Budget status not found
 */
router.get(
  '/budget-statuses/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return budgetStatusController.getById(req, res);
  })
);

export { router as budgetStatusRoutes };
