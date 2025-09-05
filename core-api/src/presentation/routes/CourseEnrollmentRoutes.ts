import { Router } from 'express';
import { Database } from '@/infraestructure/config/Database';
import { PostgresCourseEnrollmentRepository } from '@/infraestructure/repositories/PostgresCourseEnrollmentRepository';
import { GetAllCourseEnrollments } from '@/use-cases/courseEnrollment/GetAllCourseEnrollments';
import { GetCourseEnrollmentById } from '@/use-cases/courseEnrollment/GetCourseEnrollmentById';
import { CreateCourseEnrollment } from '@/use-cases/courseEnrollment/CreateCourseEnrollment';
import { UpdateCourseEnrollment } from '@/use-cases/courseEnrollment/UpdateCourseEnrollment';
import { DeleteCourseEnrollment } from '@/use-cases/courseEnrollment/DeleteCourseEnrollment';
import { CourseEnrollmentController } from '@/presentation/controllers/CourseEnrollmentController';
import { JwtTokenService } from '@/infraestructure/services/JwtTokenService';
import { createAuthMiddleware } from '@/presentation/middleware/authMiddleware';
import { asyncHandler } from '@/presentation/utils/asyncHandler';

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const courseEnrollmentRepository = new PostgresCourseEnrollmentRepository(
  prisma
);
const getAllCourseEnrollments = new GetAllCourseEnrollments(
  courseEnrollmentRepository
);
const getCourseEnrollmentById = new GetCourseEnrollmentById(
  courseEnrollmentRepository
);
const createCourseEnrollment = new CreateCourseEnrollment(
  courseEnrollmentRepository
);
const updateCourseEnrollment = new UpdateCourseEnrollment(
  courseEnrollmentRepository
);
const deleteCourseEnrollment = new DeleteCourseEnrollment(
  courseEnrollmentRepository
);
const courseEnrollmentController = new CourseEnrollmentController(
  getAllCourseEnrollments,
  getCourseEnrollmentById,
  createCourseEnrollment,
  updateCourseEnrollment,
  deleteCourseEnrollment
);

/**
 * @swagger
 * /course-enrollments:
 *   get:
 *     summary: Get all course enrollments
 *     tags: [Course Enrollments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of course enrollments
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/course-enrollments',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return courseEnrollmentController.getAll(req, res);
  })
);

/**
 * @swagger
 * /course-enrollments/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the course enrollment to retrieve
 *   get:
 *     summary: Get a course enrollment by id
 *     tags: [Course Enrollments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A course enrollment
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Course enrollment not found
 */
router.get(
  '/course-enrollments/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return courseEnrollmentController.getById(req, res);
  })
);

/**
 * @swagger
 * /course-enrollments:
 *   post:
 *     summary: Create a new course enrollment
 *     tags: [Course Enrollments]
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
 *               - courseId
 *               - enrolledAt
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user123"
 *                 description: "ID of the user enrolling in the course"
 *               courseId:
 *                 type: string
 *                 example: "course456"
 *                 description: "ID of the course to enroll in"
 *               enrolledAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-15T10:00:00Z"
 *                 description: "Date and time of enrollment"
 *               unenrolledAt:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 example: null
 *                 description: "Date and time of unenrollment (optional)"
 *     responses:
 *       201:
 *         description: Course enrollment created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/course-enrollments',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return courseEnrollmentController.create(req, res);
  })
);

/**
 * @swagger
 * /course-enrollments/{id}:
 *   put:
 *     summary: Update a course enrollment by id
 *     tags: [Course Enrollments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course enrollment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "user789"
 *                 description: "Updated user ID"
 *               courseId:
 *                 type: string
 *                 example: "course123"
 *                 description: "Updated course ID"
 *               enrolledAt:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-20T10:00:00Z"
 *                 description: "Updated enrollment date"
 *               unenrolledAt:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 example: "2024-02-15T10:00:00Z"
 *                 description: "Unenrollment date (set to unenroll user)"
 *     responses:
 *       200:
 *         description: Course enrollment updated successfully
 *       404:
 *         description: Course enrollment not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put(
  '/course-enrollments/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return courseEnrollmentController.update(req, res);
  })
);

/**
 * @swagger
 * /course-enrollments/{id}:
 *   delete:
 *     summary: Delete a course enrollment by id
 *     tags: [Course Enrollments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course enrollment ID
 *     responses:
 *       204:
 *         description: Course enrollment deleted successfully
 *       404:
 *         description: Course enrollment not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  '/course-enrollments/:id',
  authMiddleware,
  asyncHandler(async (req, res) => {
    return courseEnrollmentController.delete(req, res);
  })
);

export { router as courseEnrollmentRoutes };
