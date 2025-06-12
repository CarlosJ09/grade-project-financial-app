import { Router } from "express";
import { Database } from "@/infraestructure/config/Database";
import { PostgresTransactionRepository } from "@/infraestructure/repositories/PostgresTransactionRepository";
import { GetAllTransactions } from "@/use-cases/transaction/GetAllTransactions";
import { GetTransactionById } from "@/use-cases/transaction/GetTransactionById";
import { CreateTransaction } from "@/use-cases/transaction/CreateTransaction";
import { UpdateTransaction } from "@/use-cases/transaction/UpdateTransaction";
import { DeleteTransaction } from "@/use-cases/transaction/DeleteTransaction";
import { TransactionController } from "@/presentation/controllers/TransactionController";
import { JwtTokenService } from "@/infraestructure/services/JwtTokenService";
import { createAuthMiddleware } from "@/presentation/middleware/authMiddleware";
import { asyncHandler } from "@/presentation/utils/asyncHandler";

const router = Router();

// Create auth middleware
const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const transactionRepository = new PostgresTransactionRepository(prisma);
const getAllTransactions = new GetAllTransactions(transactionRepository);
const getTransactionById = new GetTransactionById(transactionRepository);
const createTransaction = new CreateTransaction(transactionRepository);
const updateTransaction = new UpdateTransaction(transactionRepository);
const deleteTransaction = new DeleteTransaction(transactionRepository);
const transactionController = new TransactionController(getAllTransactions, getTransactionById, createTransaction, updateTransaction, deleteTransaction);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of transactions
 *       401:
 *         description: Unauthorized
 */
router.get("/transactions", authMiddleware, asyncHandler(async (req, res) => {
    return transactionController.getAll(req, res);
}));

/**
 * @swagger
 * /transactions/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the transaction to retrieve
 *   get:
 *     summary: Get a transaction by id
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A transaction
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 */
router.get("/transactions/:id", authMiddleware, asyncHandler(async (req, res) => {
    return transactionController.getById(req, res);
}));

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
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
 *               - amount
 *               - currencyId
 *               - type
 *               - categoryId
 *               - paymentMethodId
 *               - place
 *               - transactionDate
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user123"
 *               amount:
 *                 type: number
 *                 example: 150.75
 *               currencyId:
 *                 type: string
 *                 example: "USD"
 *               exchangeRateId:
 *                 type: string
 *                 nullable: true
 *                 example: "rate123"
 *               type:
 *                 type: string
 *                 enum: [expense, income]
 *                 example: "expense"
 *               categoryId:
 *                 type: string
 *                 example: "cat123"
 *               paymentMethodId:
 *                 type: string
 *                 example: "pm123"
 *               place:
 *                 type: string
 *                 example: "Starbucks"
 *               bankingProductId:
 *                 type: string
 *                 nullable: true
 *                 example: "bp123"
 *               transactionDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T10:30:00Z"
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/transactions", authMiddleware, asyncHandler(async (req, res) => {
    return transactionController.create(req, res);
}));

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update a transaction by id
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 200.00
 *               currencyId:
 *                 type: string
 *                 example: "USD"
 *               exchangeRateId:
 *                 type: string
 *                 nullable: true
 *                 example: "rate123"
 *               type:
 *                 type: string
 *                 enum: [expense, income]
 *                 example: "expense"
 *               categoryId:
 *                 type: string
 *                 example: "cat123"
 *               paymentMethodId:
 *                 type: string
 *                 example: "pm123"
 *               place:
 *                 type: string
 *                 example: "Updated Place"
 *               bankingProductId:
 *                 type: string
 *                 nullable: true
 *                 example: "bp123"
 *               transactionDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T10:30:00Z"
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       404:
 *         description: Transaction not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put("/transactions/:id", authMiddleware, asyncHandler(async (req, res) => {
    return transactionController.update(req, res);
}));

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by id
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       204:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/transactions/:id", authMiddleware, asyncHandler(async (req, res) => {
    return transactionController.delete(req, res);
}));

export { router as transactionRoutes }; 