import { Database } from '@/infraestructure/config/Database';
import { PostgresModuleRepository } from '@/infraestructure/repositories/PostgresModuleRepository';
import { JwtTokenService } from '@/infraestructure/services/JwtTokenService';
import { ModuleController } from '@/presentation/controllers/ModuleController';
import { createAuthMiddleware } from '@/presentation/middleware/authMiddleware';
import { asyncHandler } from '@/presentation/utils/asyncHandler';
import { CreateModule } from '@/use-cases/module/CreateModule';
import { DeleteModule } from '@/use-cases/module/DeleteModule';
import { GetAllModules } from '@/use-cases/module/GetAllModules';
import { GetModuleById } from '@/use-cases/module/GetModuleById';
import { GetModulesByCourseId } from '@/use-cases/module/GetModulesByCourseId';
import { UpdateModule } from '@/use-cases/module/UpdateModule';
import { Router } from 'express';

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const moduleRepository = new PostgresModuleRepository(prisma);
const getAllModules = new GetAllModules(moduleRepository);
const getModuleById = new GetModuleById(moduleRepository);
const getModulesByCourseId = new GetModulesByCourseId(moduleRepository);
const createModule = new CreateModule(moduleRepository);
const updateModule = new UpdateModule(moduleRepository);
const deleteModule = new DeleteModule(moduleRepository);
const moduleController = new ModuleController(
  getAllModules,
  getModuleById,
  getModulesByCourseId,
  createModule,
  updateModule,
  deleteModule
);

/**
 * @swagger
 * /modules:
 *   get:
 *     summary: Get all modules
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of modules
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/modules',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return moduleController.getAll(req, res);
  })
);

/**
 * @swagger
 * /modules/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the module to retrieve
 *   get:
 *     summary: Get a module by id
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A module
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Module not found
 */
router.get(
  '/modules/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return moduleController.getById(req, res);
  })
);

/**
 * @swagger
 * /modules/course/{courseId}:
 *   parameters:
 *     - in: path
 *       name: courseId
 *       required: true
 *       schema:
 *         type: number
 *       description: The ID of the course to retrieve modules for
 *   get:
 *     summary: Get a module by course id
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A module
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Module not found
 */
router.get(
  '/modules/course/:courseId',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return moduleController.getByCourseId(req, res);
  })
);

/**
 * @swagger
 * /modules:
 *   post:
 *     summary: Create a new module
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - contentItem
 *               - sequence
 *               - summary
 *               - estimatedMinutes
 *               - releaseAt
 *             properties:
 *               courseId:
 *                 type: string
 *                 example: "course123"
 *                 description: "ID of the course this module belongs to"
 *               contentItem:
 *                 type: string
 *                 example: "Introduction to Budgeting"
 *                 description: "Content item name"
 *               sequence:
 *                 type: integer
 *                 example: 1
 *                 description: "Order sequence of the module in the course"
 *               summary:
 *                 type: string
 *                 example: "Learn the fundamentals of creating and managing a budget"
 *                 description: "Module summary"
 *               estimatedMinutes:
 *                 type: integer
 *                 example: 30
 *                 description: "Estimated time to complete in minutes"
 *               releaseAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T10:00:00Z"
 *                 description: "When the module becomes available"
 *               prerequisiteModuleId:
 *                 type: string
 *                 nullable: true
 *                 example: "module456"
 *                 description: "ID of prerequisite module (optional)"
 *     responses:
 *       201:
 *         description: Module created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/modules',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return moduleController.create(req, res);
  })
);

/**
 * @swagger
 * /modules/{id}:
 *   put:
 *     summary: Update a module by id
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Module ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 example: "course789"
 *                 description: "Updated course ID"
 *               contentItem:
 *                 type: string
 *                 example: "Advanced Budgeting Techniques"
 *                 description: "Updated content item name"
 *               sequence:
 *                 type: integer
 *                 example: 2
 *                 description: "Updated sequence order"
 *               summary:
 *                 type: string
 *                 example: "Advanced budgeting strategies and tools"
 *                 description: "Updated module summary"
 *               estimatedMinutes:
 *                 type: integer
 *                 example: 45
 *                 description: "Updated estimated completion time"
 *               releaseAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-20T10:00:00Z"
 *                 description: "Updated release date"
 *               prerequisiteModuleId:
 *                 type: string
 *                 nullable: true
 *                 example: "module123"
 *                 description: "Updated prerequisite module ID"
 *     responses:
 *       200:
 *         description: Module updated successfully
 *       404:
 *         description: Module not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put(
  '/modules/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return moduleController.update(req, res);
  })
);

/**
 * @swagger
 * /modules/{id}:
 *   delete:
 *     summary: Delete a module by id
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Module ID
 *     responses:
 *       204:
 *         description: Module deleted successfully
 *       404:
 *         description: Module not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  '/modules/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return moduleController.delete(req, res);
  })
);

export { router as moduleRoutes };
