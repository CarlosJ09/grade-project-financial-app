import { Router } from "express";
import { Database } from "@/infraestructure/config/Database";
import { PostgresBankRepository } from "@/infraestructure/repositories/PostgresBankRepository";
import { GetAllBanks } from "@/use-cases/bank/GetAllBanks";
import { GetBankById } from "@/use-cases/bank/GetBankById";
import { CreateBank } from "@/use-cases/bank/CreateBank";
import { UpdateBank } from "@/use-cases/bank/UpdateBank";
import { DeleteBank } from "@/use-cases/bank/DeleteBank";
import { BankController } from "@/presentation/controllers/BankController";
import { JwtTokenService } from "@/infraestructure/services/JwtTokenService";
import { createAuthMiddleware } from "@/presentation/middleware/authMiddleware";
import { asyncHandler } from "@/presentation/utils/asyncHandler";

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const bankRepository = new PostgresBankRepository(prisma);
const getAllBanks = new GetAllBanks(bankRepository);
const getBankById = new GetBankById(bankRepository);
const createBank = new CreateBank(bankRepository);
const updateBank = new UpdateBank(bankRepository);
const deleteBank = new DeleteBank(bankRepository);
const bankController = new BankController(getAllBanks, getBankById, createBank, updateBank, deleteBank);

/**
 * @swagger
 * /banks:
 *   get:
 *     summary: Get all banks
 *     tags: [Banks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of banks
 *       401:
 *         description: Unauthorized
 */
router.get("/banks", authMiddleware, asyncHandler(async (req, res) => {
    return bankController.getAll(req, res);
}));

/**
 * @swagger
 * /banks/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the bank to retrieve
 *   get:
 *     summary: Get a bank by id
 *     tags: [Banks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A bank
 *       401:
 *         description: Unauthorized
 */
router.get("/banks/:id", authMiddleware, asyncHandler(async (req, res) => {
    return bankController.getById(req, res);
}));

/**
 * @swagger
 * /banks:
 *   post:
 *     summary: Create a new bank
 *     tags: [Banks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Chase Bank"
 *     responses:
 *       201:
 *         description: Bank created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/banks", authMiddleware, asyncHandler(async (req, res) => {
    return bankController.create(req, res);
}));

/**
 * @swagger
 * /banks/{id}:
 *   put:
 *     summary: Update a bank by id
 *     tags: [Banks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bank ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Bank Name"
 *     responses:
 *       200:
 *         description: Bank updated successfully
 *       404:
 *         description: Bank not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put("/banks/:id", authMiddleware, asyncHandler(async (req, res) => {
    return bankController.update(req, res);
}));

/**
 * @swagger
 * /banks/{id}:
 *   delete:
 *     summary: Delete a bank by id
 *     tags: [Banks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bank ID
 *     responses:
 *       204:
 *         description: Bank deleted successfully
 *       404:
 *         description: Bank not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/banks/:id", authMiddleware, asyncHandler(async (req, res) => {
    return bankController.delete(req, res);
}));

export { router as bankRoutes };