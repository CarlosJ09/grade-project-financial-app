import { Router } from "express";
import { Database } from "@/infraestructure/config/Database";
import { PostgresBudgetRepository } from "@/infraestructure/repositories/PostgresBudgetRepository";
import { GetAllBudgets } from "@/use-cases/budget/GetAllBudgets";
import { GetBudgetById } from "@/use-cases/budget/GetBudgetById";
import { CreateBudget } from "@/use-cases/budget/CreateBudget";
import { UpdateBudget } from "@/use-cases/budget/UpdateBudget";
import { DeleteBudget } from "@/use-cases/budget/DeleteBudget";
import { BudgetController } from "@/presentation/controllers/BudgetController";
import { JwtTokenService } from "@/infraestructure/services/JwtTokenService";
import { createAuthMiddleware } from "@/presentation/middleware/authMiddleware";
import { asyncHandler } from "@/presentation/utils/asyncHandler";

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const budgetRepository = new PostgresBudgetRepository(prisma);
const getAllBudgets = new GetAllBudgets(budgetRepository);
const getBudgetById = new GetBudgetById(budgetRepository);
const createBudget = new CreateBudget(budgetRepository);
const updateBudget = new UpdateBudget(budgetRepository);
const deleteBudget = new DeleteBudget(budgetRepository);
const budgetController = new BudgetController(getAllBudgets, getBudgetById, createBudget, updateBudget, deleteBudget);

/**
 * @swagger
 * /budgets:
 *   get:
 *     summary: Get all budgets
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of budgets
 *       401:
 *         description: Unauthorized
 */
router.get("/budgets", authMiddleware, asyncHandler(async (req, res) => {
    return budgetController.getAll(req, res);
}));

/**
 * @swagger
 * /budgets/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the budget to retrieve
 *   get:
 *     summary: Get a budget by id
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A budget
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Budget not found
 */
router.get("/budgets/:id", authMiddleware, asyncHandler(async (req, res) => {
    return budgetController.getById(req, res);
}));

/**
 * @swagger
 * /budgets:
 *   post:
 *     summary: Create a new budget
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - name
 *               - description
 *               - currentAmount
 *               - goalAmount
 *               - currencyId
 *               - startDate
 *               - finishedDate
 *               - state
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user123"
 *               name:
 *                 type: string
 *                 example: "Emergency Fund"
 *               description:
 *                 type: string
 *                 example: "Saving for emergencies"
 *               currentAmount:
 *                 type: number
 *                 example: 1000.50
 *               goalAmount:
 *                 type: number
 *                 example: 5000.00
 *               currencyId:
 *                 type: string
 *                 example: "USD"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-01T00:00:00Z"
 *               finishedDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-31T23:59:59Z"
 *               state:
 *                 type: string
 *                 enum: [active, inactive, completed]
 *                 example: "active"
 *     responses:
 *       201:
 *         description: Budget created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/budgets", authMiddleware, asyncHandler(async (req, res) => {
    return budgetController.create(req, res);
}));

/**
 * @swagger
 * /budgets/{id}:
 *   put:
 *     summary: Update a budget by id
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Budget ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Emergency Fund"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               currentAmount:
 *                 type: number
 *                 example: 1500.00
 *               goalAmount:
 *                 type: number
 *                 example: 6000.00
 *               currencyId:
 *                 type: string
 *                 example: "USD"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-01T00:00:00Z"
 *               finishedDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-31T23:59:59Z"
 *               state:
 *                 type: string
 *                 enum: [active, inactive, completed]
 *                 example: "active"
 *     responses:
 *       200:
 *         description: Budget updated successfully
 *       404:
 *         description: Budget not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put("/budgets/:id", authMiddleware, asyncHandler(async (req, res) => {
    return budgetController.update(req, res);
}));

/**
 * @swagger
 * /budgets/{id}:
 *   delete:
 *     summary: Delete a budget by id
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Budget ID
 *     responses:
 *       204:
 *         description: Budget deleted successfully
 *       404:
 *         description: Budget not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/budgets/:id", authMiddleware, asyncHandler(async (req, res) => {
    return budgetController.delete(req, res);
}));

export { router as budgetRoutes }; 