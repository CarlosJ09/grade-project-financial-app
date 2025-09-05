import { Router } from 'express';
import { Database } from '@/infraestructure/config/Database';
import { PostgresBankingProductRepository } from '@/infraestructure/repositories/PostgresBankingProductRepository';
import { GetAllBankingProducts } from '@/use-cases/bankingProduct/GetAllBankingProducts';
import { GetBankingProductById } from '@/use-cases/bankingProduct/GetBankingProductById';
import { CreateBankingProduct } from '@/use-cases/bankingProduct/CreateBankingProduct';
import { UpdateBankingProduct } from '@/use-cases/bankingProduct/UpdateBankingProduct';
import { DeleteBankingProduct } from '@/use-cases/bankingProduct/DeleteBankingProduct';
import { BankingProductController } from '@/presentation/controllers/BankingProductController';
import { JwtTokenService } from '@/infraestructure/services/JwtTokenService';
import { createAuthMiddleware } from '@/presentation/middleware/authMiddleware';
import { asyncHandler } from '@/presentation/utils/asyncHandler';

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const bankingProductRepository = new PostgresBankingProductRepository(prisma);
const getAllBankingProducts = new GetAllBankingProducts(
  bankingProductRepository
);
const getBankingProductById = new GetBankingProductById(
  bankingProductRepository
);
const createBankingProduct = new CreateBankingProduct(bankingProductRepository);
const updateBankingProduct = new UpdateBankingProduct(bankingProductRepository);
const deleteBankingProduct = new DeleteBankingProduct(bankingProductRepository);
const bankingProductController = new BankingProductController(
  getAllBankingProducts,
  getBankingProductById,
  createBankingProduct,
  updateBankingProduct,
  deleteBankingProduct
);

/**
 * @swagger
 * /banking-products:
 *   get:
 *     summary: Get all banking products
 *     tags: [Banking Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of banking products
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/banking-products',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return bankingProductController.getAll(req, res);
  })
);

/**
 * @swagger
 * /banking-products/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the banking product to retrieve
 *   get:
 *     summary: Get a banking product by id
 *     tags: [Banking Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A banking product
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Banking product not found
 */
router.get(
  '/banking-products/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return bankingProductController.getById(req, res);
  })
);

/**
 * @swagger
 * /banking-products:
 *   post:
 *     summary: Create a new banking product
 *     tags: [Banking Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bankingProductName
 *             properties:
 *               bankingProductName:
 *                 type: string
 *                 example: "Credit Card"
 *                 description: "Type of banking product (e.g., Credit Card, Savings Account, Loan)"
 *     responses:
 *       201:
 *         description: Banking product created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/banking-products',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return bankingProductController.create(req, res);
  })
);

/**
 * @swagger
 * /banking-products/{id}:
 *   put:
 *     summary: Update a banking product by id
 *     tags: [Banking Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banking product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bankingProductName:
 *                 type: string
 *                 example: "Updated Credit Card"
 *                 description: "Type of banking product"
 *     responses:
 *       200:
 *         description: Banking product updated successfully
 *       404:
 *         description: Banking product not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put(
  '/banking-products/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return bankingProductController.update(req, res);
  })
);

/**
 * @swagger
 * /banking-products/{id}:
 *   delete:
 *     summary: Delete a banking product by id
 *     tags: [Banking Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Banking product ID
 *     responses:
 *       204:
 *         description: Banking product deleted successfully
 *       404:
 *         description: Banking product not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  '/banking-products/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return bankingProductController.delete(req, res);
  })
);

export { router as bankingProductRoutes };
