import { Router } from "express";
import { Database } from "@/infraestructure/config/Database";
import { PostgresCourseRepository } from "@/infraestructure/repositories/PostgresCourseRepository";
import { GetAllCourses } from "@/use-cases/course/GetAllCourses";
import { GetCourseById } from "@/use-cases/course/GetCourseById";
import { CreateCourse } from "@/use-cases/course/CreateCourse";
import { UpdateCourse } from "@/use-cases/course/UpdateCourse";
import { DeleteCourse } from "@/use-cases/course/DeleteCourse";
import { CourseController } from "@/presentation/controllers/CourseController";
import { JwtTokenService } from "@/infraestructure/services/JwtTokenService";
import { createAuthMiddleware } from "@/presentation/middleware/authMiddleware";
import { asyncHandler } from "@/presentation/utils/asyncHandler";

const router = Router();

const tokenService = new JwtTokenService();
const authMiddleware = createAuthMiddleware(tokenService);

const prisma = Database.getInstance();
const courseRepository = new PostgresCourseRepository(prisma);
const getAllCourses = new GetAllCourses(courseRepository);
const getCourseById = new GetCourseById(courseRepository);
const createCourse = new CreateCourse(courseRepository);
const updateCourse = new UpdateCourse(courseRepository);
const deleteCourse = new DeleteCourse(courseRepository);
const courseController = new CourseController(getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of courses
 *       401:
 *         description: Unauthorized
 */
router.get("/courses", authMiddleware, asyncHandler(async (req, res) => {
    return courseController.getAll(req, res);
}));

/**
 * @swagger
 * /courses/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the course to retrieve
 *   get:
 *     summary: Get a course by id
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A course
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Course not found
 */
router.get("/courses/:id", authMiddleware, asyncHandler(async (req, res) => {
    return courseController.getById(req, res);
}));

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
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
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Financial Literacy 101"
 *                 description: "Course name"
 *               description:
 *                 type: string
 *                 example: "Learn the basics of personal finance and budgeting"
 *                 description: "Course description"
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/courses", authMiddleware, asyncHandler(async (req, res) => {
    return courseController.create(req, res);
}));

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course by id
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Advanced Financial Planning"
 *                 description: "Updated course name"
 *               description:
 *                 type: string
 *                 example: "Advanced concepts in financial planning and investment"
 *                 description: "Updated course description"
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put("/courses/:id", authMiddleware, asyncHandler(async (req, res) => {
    return courseController.update(req, res);
}));

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course by id
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       204:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/courses/:id", authMiddleware, asyncHandler(async (req, res) => {
    return courseController.delete(req, res);
}));

export { router as courseRoutes }; 