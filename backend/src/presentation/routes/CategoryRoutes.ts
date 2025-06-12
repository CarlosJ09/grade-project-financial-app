import { Router } from "express";
import { Database } from "@/infraestructure/config/Database";
import { PostgresCategoryRepository } from "@/infraestructure/repositories/PostgresCategoryRepository";
import { GetAllCategories } from "@/use-cases/category/GetAllCategories";
import { GetCategoryById } from "@/use-cases/category/GetCategoryById";
import { CreateCategory } from "@/use-cases/category/CreateCategory";
import { UpdateCategory } from "@/use-cases/category/UpdateCategory";
import { DeleteCategory } from "@/use-cases/category/DeleteCategory";
import { CategoryController } from "@/presentation/controllers/CategoryController";
import { JwtTokenService } from "@/infraestructure/services/JwtTokenService";
import { createAuthMiddleware } from "@/presentation/middleware/authMiddleware";
import { asyncHandler } from "@/presentation/utils/asyncHandler";

const router = Router();

// Create auth middleware
const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const categoryRepository = new PostgresCategoryRepository(prisma);
const getAllCategories = new GetAllCategories(categoryRepository);
const getCategoryById = new GetCategoryById(categoryRepository);
const createCategory = new CreateCategory(categoryRepository);
const updateCategory = new UpdateCategory(categoryRepository);
const deleteCategory = new DeleteCategory(categoryRepository);
const categoryController = new CategoryController(getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of categories
 *       401:
 *         description: Unauthorized
 */
router.get("/categories", authMiddleware, asyncHandler(async (req, res) => {
    return categoryController.getAll(req, res);
}));

/**
 * @swagger
 * /categories/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the category to retrieve
 *   get:
 *     summary: Get a category by id
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A category
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 */
router.get("/categories/:id", authMiddleware, asyncHandler(async (req, res) => {
    return categoryController.getById(req, res);
}));

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
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
 *               - kind
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Food & Dining"
 *               kind:
 *                 type: string
 *                 enum: [expense, income, budget]
 *                 example: "expense"
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/categories", authMiddleware, asyncHandler(async (req, res) => {
    return categoryController.create(req, res);
}));

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category by id
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Food & Dining"
 *               kind:
 *                 type: string
 *                 enum: [expense, income, budget]
 *                 example: "expense"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put("/categories/:id", authMiddleware, asyncHandler(async (req, res) => {
    return categoryController.update(req, res);
}));

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by id
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/categories/:id", authMiddleware, asyncHandler(async (req, res) => {
    return categoryController.delete(req, res);
}));

export { router as categoryRoutes }; 