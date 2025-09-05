import { Router } from 'express';
import { Database } from '@/infraestructure/config/Database';
import { PostgresContentItemRepository } from '@/infraestructure/repositories/PostgresContentItemRepository';
import { GetAllContentItems } from '@/use-cases/contentItem/GetAllContentItems';
import { GetContentItemById } from '@/use-cases/contentItem/GetContentItemById';
import { CreateContentItem } from '@/use-cases/contentItem/CreateContentItem';
import { UpdateContentItem } from '@/use-cases/contentItem/UpdateContentItem';
import { DeleteContentItem } from '@/use-cases/contentItem/DeleteContentItem';
import { ContentItemController } from '@/presentation/controllers/ContentItemController';
import { JwtTokenService } from '@/infraestructure/services/JwtTokenService';
import { createAuthMiddleware } from '@/presentation/middleware/authMiddleware';
import { asyncHandler } from '@/presentation/utils/asyncHandler';

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const contentItemRepository = new PostgresContentItemRepository(prisma);
const getAllContentItems = new GetAllContentItems(contentItemRepository);
const getContentItemById = new GetContentItemById(contentItemRepository);
const createContentItem = new CreateContentItem(contentItemRepository);
const updateContentItem = new UpdateContentItem(contentItemRepository);
const deleteContentItem = new DeleteContentItem(contentItemRepository);
const contentItemController = new ContentItemController(
  getAllContentItems,
  getContentItemById,
  createContentItem,
  updateContentItem,
  deleteContentItem
);

/**
 * @swagger
 * /content-items:
 *   get:
 *     summary: Get all content items
 *     tags: [Content Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of content items
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/content-items',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return contentItemController.getAll(req, res);
  })
);

/**
 * @swagger
 * /content-items/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the content item to retrieve
 *   get:
 *     summary: Get a content item by id
 *     tags: [Content Items]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A content item
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Content item not found
 */
router.get(
  '/content-items/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return contentItemController.getById(req, res);
  })
);

/**
 * @swagger
 * /content-items:
 *   post:
 *     summary: Create a new content item
 *     tags: [Content Items]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sectionId
 *               - moduleId
 *               - sequence
 *               - title
 *               - fileUrl
 *               - markdownBody
 *             properties:
 *               sectionId:
 *                 type: string
 *                 example: "section123"
 *                 description: "Section identifier"
 *               moduleId:
 *                 type: string
 *                 example: "module456"
 *                 description: "ID of the module this content belongs to"
 *               sequence:
 *                 type: integer
 *                 example: 1
 *                 description: "Order sequence of the content item"
 *               title:
 *                 type: string
 *                 example: "Introduction to Personal Finance"
 *                 description: "Content item title"
 *               fileUrl:
 *                 type: string
 *                 example: "https://example.com/content/intro-finance.pdf"
 *                 description: "URL to the content file"
 *               markdownBody:
 *                 type: string
 *                 example: "# Introduction\n\nThis lesson covers the basics of personal finance..."
 *                 description: "Markdown content body"
 *     responses:
 *       201:
 *         description: Content item created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/content-items',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return contentItemController.create(req, res);
  })
);

/**
 * @swagger
 * /content-items/{id}:
 *   put:
 *     summary: Update a content item by id
 *     tags: [Content Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Content item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sectionId:
 *                 type: string
 *                 example: "section789"
 *                 description: "Updated section identifier"
 *               moduleId:
 *                 type: string
 *                 example: "module123"
 *                 description: "Updated module ID"
 *               sequence:
 *                 type: integer
 *                 example: 2
 *                 description: "Updated sequence order"
 *               title:
 *                 type: string
 *                 example: "Advanced Personal Finance Strategies"
 *                 description: "Updated content title"
 *               fileUrl:
 *                 type: string
 *                 example: "https://example.com/content/advanced-finance.pdf"
 *                 description: "Updated file URL"
 *               markdownBody:
 *                 type: string
 *                 example: "# Advanced Strategies\n\nThis lesson covers advanced financial concepts..."
 *                 description: "Updated markdown content"
 *     responses:
 *       200:
 *         description: Content item updated successfully
 *       404:
 *         description: Content item not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put(
  '/content-items/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return contentItemController.update(req, res);
  })
);

/**
 * @swagger
 * /content-items/{id}:
 *   delete:
 *     summary: Delete a content item by id
 *     tags: [Content Items]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Content item ID
 *     responses:
 *       204:
 *         description: Content item deleted successfully
 *       404:
 *         description: Content item not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  '/content-items/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return contentItemController.delete(req, res);
  })
);

export { router as contentItemRoutes };
