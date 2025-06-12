import { Router, Request, Response } from "express";
import { PostgresUserRepository } from "@/infraestructure/repositories/PostgresUserRepository";

import { GetAllUsers } from "@/use-cases/user/GetAllUsers";
import { GetUserById } from "@/use-cases/user/GetUserById";
import { UserController } from "@/presentation/controllers/UserController";

import { PrismaClient } from "@/infraestructure/prisma/generated/prisma";

import { asyncHandler } from "@/presentation/utils/asyncHandler";

const router = Router();

const prisma = new PrismaClient();
const userRepository = new PostgresUserRepository(prisma);
const getAllUsers = new GetAllUsers(userRepository);
const getUserById = new GetUserById(userRepository);

const userController = new UserController(getAllUsers, getUserById);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/users", asyncHandler((req, res) => userController.getAll(req, res)));

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by id
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A user
 */
router.get("/users/:id", asyncHandler((req, res) => userController.getById(req, res)));

export { router as userRoutes };