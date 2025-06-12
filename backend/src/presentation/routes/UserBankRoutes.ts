import { Router } from "express";
import { Database } from "@/infraestructure/config/Database";
import { PostgresUserBankRepository } from "@/infraestructure/repositories/PostgresUserBankRepository";
import { GetAllUserBanks } from "@/use-cases/userBank/GetAllUserBanks";
import { GetUserBankById } from "@/use-cases/userBank/GetUserBankById";
import { CreateUserBank } from "@/use-cases/userBank/CreateUserBank";
import { UpdateUserBank } from "@/use-cases/userBank/UpdateUserBank";
import { DeleteUserBank } from "@/use-cases/userBank/DeleteUserBank";
import { UserBankController } from "@/presentation/controllers/UserBankController";
import { JwtTokenService } from "@/infraestructure/services/JwtTokenService";
import { createAuthMiddleware } from "@/presentation/middleware/authMiddleware";
import { asyncHandler } from "@/presentation/utils/asyncHandler";

const router = Router();

// Create auth middleware
const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const userBankRepository = new PostgresUserBankRepository(prisma);
const getAllUserBanks = new GetAllUserBanks(userBankRepository);
const getUserBankById = new GetUserBankById(userBankRepository);
const createUserBank = new CreateUserBank(userBankRepository);
const updateUserBank = new UpdateUserBank(userBankRepository);
const deleteUserBank = new DeleteUserBank(userBankRepository);
const userBankController = new UserBankController(getAllUserBanks, getUserBankById, createUserBank, updateUserBank, deleteUserBank);

/**
 * @swagger
 * /user-banks:
 *   get:
 *     summary: Get all user bank connections
 *     tags: [User Banks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user bank connections
 *       401:
 *         description: Unauthorized
 */
router.get("/user-banks", authMiddleware, asyncHandler(async (req, res) => {
    return userBankController.getAll(req, res);
}));

/**
 * @swagger
 * /user-banks/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the user bank connection to retrieve
 *   get:
 *     summary: Get a user bank connection by id
 *     tags: [User Banks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A user bank connection
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User bank connection not found
 */
router.get("/user-banks/:id", authMiddleware, asyncHandler(async (req, res) => {
    return userBankController.getById(req, res);
}));

/**
 * @swagger
 * /user-banks:
 *   post:
 *     summary: Create a new user bank connection
 *     tags: [User Banks]
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
 *               - bankId
 *               - alias
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user123"
 *               bankId:
 *                 type: string
 *                 example: "bank456"
 *               alias:
 *                 type: string
 *                 example: "My Main Checking Account"
 *               lastSyncAt:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 example: "2024-01-15T10:30:00Z"
 *     responses:
 *       201:
 *         description: User bank connection created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/user-banks", authMiddleware, asyncHandler(async (req, res) => {
    return userBankController.create(req, res);
}));

/**
 * @swagger
 * /user-banks/{id}:
 *   put:
 *     summary: Update a user bank connection by id
 *     tags: [User Banks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User bank connection ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alias:
 *                 type: string
 *                 example: "Updated Account Alias"
 *               lastSyncAt:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 example: "2024-01-15T10:30:00Z"
 *     responses:
 *       200:
 *         description: User bank connection updated successfully
 *       404:
 *         description: User bank connection not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put("/user-banks/:id", authMiddleware, asyncHandler(async (req, res) => {
    return userBankController.update(req, res);
}));

/**
 * @swagger
 * /user-banks/{id}:
 *   delete:
 *     summary: Delete a user bank connection by id
 *     tags: [User Banks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User bank connection ID
 *     responses:
 *       204:
 *         description: User bank connection deleted successfully
 *       404:
 *         description: User bank connection not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/user-banks/:id", authMiddleware, asyncHandler(async (req, res) => {
    return userBankController.delete(req, res);
}));

export { router as userBankRoutes }; 