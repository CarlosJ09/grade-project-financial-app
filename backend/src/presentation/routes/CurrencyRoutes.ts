import { Router } from "express";
import { Database } from "@/infraestructure/config/Database";
import { PostgresCurrencyRepository } from "@/infraestructure/repositories/PostgresCurrencyRepository";
import { GetAllCurrencies } from "@/use-cases/currency/GetAllCurrencies";
import { GetCurrencyById } from "@/use-cases/currency/GetCurrencyById";
import { CurrencyController } from "@/presentation/controllers/CurrencyController";
import { JwtTokenService } from "@/infraestructure/services/JwtTokenService";
import { createAuthMiddleware } from "@/presentation/middleware/authMiddleware";
import { asyncHandler } from "@/presentation/utils/asyncHandler";

const router = Router();

// Create auth middleware
const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const currencyRepository = new PostgresCurrencyRepository(prisma);
const getAllCurrencies = new GetAllCurrencies(currencyRepository);
const getCurrencyById = new GetCurrencyById(currencyRepository);
const currencyController = new CurrencyController(getAllCurrencies, getCurrencyById);

/**
 * @swagger
 * /currencies:
 *   get:
 *     summary: Get all available currencies
 *     description: Retrieve a list of all available currencies for use in transactions and budgets. Returns currencies sorted alphabetically by currency code.
 *     tags: [Currencies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of available currencies
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
 *                         type: string
 *                         example: "550e8400-e29b-41d4-a716-446655440000"
 *                       currency:
 *                         type: string
 *                         example: "USD"
 *                         description: "3-character ISO 4217 currency code"
 *       401:
 *         description: Unauthorized
 */
router.get("/currencies", authMiddleware, asyncHandler(async (req, res) => {
    return currencyController.getAll(req, res);
}));

/**
 * @swagger
 * /currencies/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the currency to retrieve
 *   get:
 *     summary: Get a currency by id
 *     description: Retrieve details of a specific currency by its ID.
 *     tags: [Currencies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Currency details
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
 *                     id:
 *                       type: string
 *                       example: "550e8400-e29b-41d4-a716-446655440000"
 *                     currency:
 *                       type: string
 *                       example: "USD"
 *                       description: "3-character ISO 4217 currency code"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Currency not found
 */
router.get("/currencies/:id", authMiddleware, asyncHandler(async (req, res) => {
    return currencyController.getById(req, res);
}));

export { router as currencyRoutes }; 