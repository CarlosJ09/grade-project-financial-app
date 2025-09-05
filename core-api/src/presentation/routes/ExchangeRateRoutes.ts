import { Router } from 'express';
import { Database } from '@/infraestructure/config/Database';
import { PostgresExchangeRateRepository } from '@/infraestructure/repositories/PostgresExchangeRateRepository';
import { GetAllExchangeRates } from '@/use-cases/exchangeRate/GetAllExchangeRates';
import { GetExchangeRateById } from '@/use-cases/exchangeRate/GetExchangeRateById';
import { CreateExchangeRate } from '@/use-cases/exchangeRate/CreateExchangeRate';
import { UpdateExchangeRate } from '@/use-cases/exchangeRate/UpdateExchangeRate';
import { DeleteExchangeRate } from '@/use-cases/exchangeRate/DeleteExchangeRate';
import { ExchangeRateController } from '@/presentation/controllers/ExchangeRateController';
import { JwtTokenService } from '@/infraestructure/services/JwtTokenService';
import { createAuthMiddleware } from '@/presentation/middleware/authMiddleware';
import { asyncHandler } from '@/presentation/utils/asyncHandler';

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const exchangeRateRepository = new PostgresExchangeRateRepository(prisma);
const getAllExchangeRates = new GetAllExchangeRates(exchangeRateRepository);
const getExchangeRateById = new GetExchangeRateById(exchangeRateRepository);
const createExchangeRate = new CreateExchangeRate(exchangeRateRepository);
const updateExchangeRate = new UpdateExchangeRate(exchangeRateRepository);
const deleteExchangeRate = new DeleteExchangeRate(exchangeRateRepository);
const exchangeRateController = new ExchangeRateController(
  getAllExchangeRates,
  getExchangeRateById,
  createExchangeRate,
  updateExchangeRate,
  deleteExchangeRate
);

/**
 * @swagger
 * /exchange-rates:
 *   get:
 *     summary: Get all exchange rates
 *     tags: [Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of exchange rates
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/exchange-rates',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return exchangeRateController.getAll(req, res);
  })
);

/**
 * @swagger
 * /exchange-rates/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the exchange rate to retrieve
 *   get:
 *     summary: Get an exchange rate by id
 *     tags: [Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: An exchange rate
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Exchange rate not found
 */
router.get(
  '/exchange-rates/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return exchangeRateController.getById(req, res);
  })
);

/**
 * @swagger
 * /exchange-rates:
 *   post:
 *     summary: Create a new exchange rate
 *     tags: [Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currencyId
 *               - rate
 *               - rateDate
 *             properties:
 *               currencyId:
 *                 type: string
 *                 example: "USD"
 *                 description: "Currency identifier"
 *               rate:
 *                 type: number
 *                 example: 1.2345
 *                 description: "Exchange rate value"
 *               rateDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T10:30:00Z"
 *                 description: "Date when the rate was recorded"
 *     responses:
 *       201:
 *         description: Exchange rate created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/exchange-rates',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return exchangeRateController.create(req, res);
  })
);

/**
 * @swagger
 * /exchange-rates/{id}:
 *   put:
 *     summary: Update an exchange rate by id
 *     tags: [Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exchange rate ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currencyId:
 *                 type: string
 *                 example: "EUR"
 *                 description: "Currency identifier"
 *               rate:
 *                 type: number
 *                 example: 1.3456
 *                 description: "Updated exchange rate value"
 *               rateDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-16T10:30:00Z"
 *                 description: "Updated rate date"
 *     responses:
 *       200:
 *         description: Exchange rate updated successfully
 *       404:
 *         description: Exchange rate not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put(
  '/exchange-rates/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return exchangeRateController.update(req, res);
  })
);

/**
 * @swagger
 * /exchange-rates/{id}:
 *   delete:
 *     summary: Delete an exchange rate by id
 *     tags: [Exchange Rates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Exchange rate ID
 *     responses:
 *       204:
 *         description: Exchange rate deleted successfully
 *       404:
 *         description: Exchange rate not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  '/exchange-rates/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return exchangeRateController.delete(req, res);
  })
);

export { router as exchangeRateRoutes };
