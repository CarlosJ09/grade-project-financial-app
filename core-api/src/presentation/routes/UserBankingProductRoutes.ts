import { Database } from '@/infraestructure/config/Database';
import { PostgresUserBankingProductRepository } from '@/infraestructure/repositories/PostgresUserBankingProductRepository';
import { JwtTokenService } from '@/infraestructure/services/JwtTokenService';
import { UserBankingProductController } from '@/presentation/controllers/UserBankingProductController';
import { createAuthMiddleware } from '@/presentation/middleware/authMiddleware';
import { asyncHandler } from '@/presentation/utils/asyncHandler';
import { CreateUserBankingProduct } from '@/use-cases/userBankingProduct/CreateUserBankingProduct';
import { DeleteUserBankingProduct } from '@/use-cases/userBankingProduct/DeleteUserBankingProduct';
import { GetAllUserBankingProductsByUserId } from '@/use-cases/userBankingProduct/GetAllUserBankingProductsByUserId';
import { GetUserBankingProductById } from '@/use-cases/userBankingProduct/GetUserBankingProductById';
import { UpdateUserBankingProduct } from '@/use-cases/userBankingProduct/UpdateUserBankingProduct';
import { Router } from 'express';

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const userBankingProductRepository = new PostgresUserBankingProductRepository(
  prisma
);
const getAllUserBankingProductsByUserId = new GetAllUserBankingProductsByUserId(
  userBankingProductRepository
);
const getUserBankingProductById = new GetUserBankingProductById(
  userBankingProductRepository
);
const createUserBankingProduct = new CreateUserBankingProduct(
  userBankingProductRepository
);
const updateUserBankingProduct = new UpdateUserBankingProduct(
  userBankingProductRepository
);
const deleteUserBankingProduct = new DeleteUserBankingProduct(
  userBankingProductRepository
);
const userBankingProductController = new UserBankingProductController(
  getAllUserBankingProductsByUserId,
  getUserBankingProductById,
  createUserBankingProduct,
  updateUserBankingProduct,
  deleteUserBankingProduct
);

/**
 * @swagger
 * /user-banking-products/user/{userId}:
 *   get:
 *     summary: Get all user banking products by user id
 *     tags: [User Banking Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter products by user ID
 *     responses:
 *       200:
 *         description: A list of user banking products
 *         content:
 *           application/json:
 *             schema:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "uuid-123"
 *                       userId:
 *                         type: string
 *                         example: "user-uuid"
 *                       bankBankingProductId:
 *                         type: integer
 *                         example: 1
 *                       referenceNumber:
 *                         type: string
 *                         example: "1234567890"
 *                       label:
 *                         type: string
 *                         example: "My Checking Account"
 *                       currencyId:
 *                         type: integer
 *                         example: 1
 *                       bankBankingProduct:
 *                         type: object
 *                         properties:
 *                           bank:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: "Chase Bank"
 *                           bankingProduct:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                                 example: "Checking Account"
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/user-banking-products/user/:userId',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return userBankingProductController.getAllByUserId(req, res);
  })
);

/**
 * @swagger
 * /user-banking-products/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the user banking product to retrieve
 *   get:
 *     summary: Get a user banking product by id
 *     tags: [User Banking Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A user banking product
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User banking product not found
 */
router.get(
  '/user-banking-products/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return userBankingProductController.getById(req, res);
  })
);

/**
 * @swagger
 * /user-banking-products:
 *   post:
 *     summary: Create a new user banking product
 *     tags: [User Banking Products]
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
 *               - bankBankingProductId
 *               - referenceNumber
 *               - label
 *               - currencyId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user-uuid-123"
 *               bankBankingProductId:
 *                 type: integer
 *                 example: 1
 *                 description: The ID of the bank banking product combination
 *               referenceNumber:
 *                 type: string
 *                 example: "1234567890"
 *                 description: Account number or reference from the bank
 *               label:
 *                 type: string
 *                 example: "My Main Checking"
 *                 description: User-friendly label for this account
 *               currencyId:
 *                 type: integer
 *                 example: 1
 *                 description: The currency ID for this account
 *     responses:
 *       201:
 *         description: User banking product created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/user-banking-products',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return userBankingProductController.create(req, res);
  })
);

/**
 * @swagger
 * /user-banking-products/{id}:
 *   put:
 *     summary: Update a user banking product by id
 *     tags: [User Banking Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User banking product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               referenceNumber:
 *                 type: string
 *                 example: "9876543210"
 *               label:
 *                 type: string
 *                 example: "Updated Account Label"
 *               currencyId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: User banking product updated successfully
 *       404:
 *         description: User banking product not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put(
  '/user-banking-products/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return userBankingProductController.update(req, res);
  })
);

/**
 * @swagger
 * /user-banking-products/{id}:
 *   delete:
 *     summary: Delete a user banking product by id
 *     tags: [User Banking Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User banking product ID
 *     responses:
 *       204:
 *         description: User banking product deleted successfully
 *       404:
 *         description: User banking product not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  '/user-banking-products/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return userBankingProductController.delete(req, res);
  })
);

export { router as userBankingProductRoutes };
