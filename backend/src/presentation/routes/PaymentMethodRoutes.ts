import { Router } from "express";
import { Database } from "@/infraestructure/config/Database";
import { PostgresPaymentMethodRepository } from "@/infraestructure/repositories/PostgresPaymentMethodRepository";
import { GetAllPaymentMethods } from "@/use-cases/paymentMethod/GetAllPaymentMethods";
import { GetPaymentMethodById } from "@/use-cases/paymentMethod/GetPaymentMethodById";
import { CreatePaymentMethod } from "@/use-cases/paymentMethod/CreatePaymentMethod";
import { UpdatePaymentMethod } from "@/use-cases/paymentMethod/UpdatePaymentMethod";
import { DeletePaymentMethod } from "@/use-cases/paymentMethod/DeletePaymentMethod";
import { PaymentMethodController } from "@/presentation/controllers/PaymentMethodController";
import { JwtTokenService } from "@/infraestructure/services/JwtTokenService";
import { createAuthMiddleware } from "@/presentation/middleware/authMiddleware";
import { asyncHandler } from "@/presentation/utils/asyncHandler";

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const paymentMethodRepository = new PostgresPaymentMethodRepository(prisma);
const getAllPaymentMethods = new GetAllPaymentMethods(paymentMethodRepository);
const getPaymentMethodById = new GetPaymentMethodById(paymentMethodRepository);
const createPaymentMethod = new CreatePaymentMethod(paymentMethodRepository);
const updatePaymentMethod = new UpdatePaymentMethod(paymentMethodRepository);
const deletePaymentMethod = new DeletePaymentMethod(paymentMethodRepository);
const paymentMethodController = new PaymentMethodController(getAllPaymentMethods, getPaymentMethodById, createPaymentMethod, updatePaymentMethod, deletePaymentMethod);

/**
 * @swagger
 * /payment-methods:
 *   get:
 *     summary: Get all payment methods
 *     tags: [Payment Methods]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of payment methods
 *       401:
 *         description: Unauthorized
 */
router.get("/payment-methods", authMiddleware, asyncHandler(async (req, res) => {
    return paymentMethodController.getAll(req, res);
}));

/**
 * @swagger
 * /payment-methods/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the payment method to retrieve
 *   get:
 *     summary: Get a payment method by id
 *     tags: [Payment Methods]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A payment method
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Payment method not found
 */
router.get("/payment-methods/:id", authMiddleware, asyncHandler(async (req, res) => {
    return paymentMethodController.getById(req, res);
}));

/**
 * @swagger
 * /payment-methods:
 *   post:
 *     summary: Create a new payment method
 *     tags: [Payment Methods]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentMethod
 *             properties:
 *               paymentMethod:
 *                 type: string
 *                 enum: [credit_card, debit_card, cash, bank_transfer, digital_wallet, check]
 *                 example: "credit_card"
 *     responses:
 *       201:
 *         description: Payment method created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/payment-methods", authMiddleware, asyncHandler(async (req, res) => {
    return paymentMethodController.create(req, res);
}));

/**
 * @swagger
 * /payment-methods/{id}:
 *   put:
 *     summary: Update a payment method by id
 *     tags: [Payment Methods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment method ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentMethod:
 *                 type: string
 *                 enum: [credit_card, debit_card, cash, bank_transfer, digital_wallet, check]
 *                 example: "debit_card"
 *     responses:
 *       200:
 *         description: Payment method updated successfully
 *       404:
 *         description: Payment method not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put("/payment-methods/:id", authMiddleware, asyncHandler(async (req, res) => {
    return paymentMethodController.update(req, res);
}));

/**
 * @swagger
 * /payment-methods/{id}:
 *   delete:
 *     summary: Delete a payment method by id
 *     tags: [Payment Methods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment method ID
 *     responses:
 *       204:
 *         description: Payment method deleted successfully
 *       404:
 *         description: Payment method not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/payment-methods/:id", authMiddleware, asyncHandler(async (req, res) => {
    return paymentMethodController.delete(req, res);
}));

export { router as paymentMethodRoutes }; 