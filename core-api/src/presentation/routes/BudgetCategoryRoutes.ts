import { Database } from '@/infraestructure/config/Database';
import { PostgresBudgetCategoryRepository } from '@/infraestructure/repositories/PostgresBudgetCategoryRepository';
import { JwtTokenService } from '@/infraestructure/services/JwtTokenService';
import { BudgetCategoryController } from '@/presentation/controllers/BudgetCategoryController';
import { createAuthMiddleware } from '@/presentation/middleware/authMiddleware';
import { asyncHandler } from '@/presentation/utils/asyncHandler';
import { GetAllBudgetCategories } from '@/use-cases/budgetCategory/GetAllBudgetCategories';
import { GetBudgetCategoryById } from '@/use-cases/budgetCategory/GetBudgetCategoryById';
import { Router } from 'express';

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const budgetCategoryRepository = new PostgresBudgetCategoryRepository(prisma);
const getAllBudgetCategories = new GetAllBudgetCategories(
  budgetCategoryRepository
);
const getBudgetCategoryById = new GetBudgetCategoryById(
  budgetCategoryRepository
);
const budgetCategoryController = new BudgetCategoryController(
  getAllBudgetCategories,
  getBudgetCategoryById
);

/**
 * @swagger
 * /budget-categories:
 *   get:
 *     summary: Get all budget categories
 *     tags: [Budget Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: budgetTypeId
 *         schema:
 *           type: integer
 *         description: Filter categories by budget type ID
 *     responses:
 *       200:
 *         description: A list of budget categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Emergency Fund"
 *                   budgetTypeId:
 *                     type: integer
 *                     example: 1
 *                   budgetType:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/budget-categories',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return budgetCategoryController.getAll(req, res);
  })
);

/**
 * @swagger
 * /budget-categories/{id}:
 *   get:
 *     summary: Get a budget category by id
 *     tags: [Budget Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the budget category to retrieve
 *     responses:
 *       200:
 *         description: A budget category
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Budget category not found
 */
router.get(
  '/budget-categories/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return budgetCategoryController.getById(req, res);
  })
);

export { router as budgetCategoryRoutes };
