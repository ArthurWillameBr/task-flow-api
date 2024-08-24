import { Router } from "express";
import { register } from "./controller/user/register";
import { authenticate } from "./controller/user/authenticate";
import { profile } from "./controller/user/profile";
import { verifyJwt } from "./middleware/verify-jwt";
import { createTask } from "./controller/task/create-task";
import { getTasks } from "./controller/task/get-tasks";

const router: Router = Router();

router.post("/users", register)
router.post("/sessions", authenticate)

// Protected routes
router.get("/profile", verifyJwt, profile)
router.post("/tasks", verifyJwt, createTask)
router.get("/tasks", verifyJwt, getTasks)

export default router