import { Router } from "express";
import { register } from "./controller/user/register";
import { authenticate } from "./controller/user/authenticate";
import { profile } from "./controller/user/profile";
import { verifyJwt } from "./middleware/verify-jwt";
import { createTask } from "./controller/task/create-task";
import { getTasks } from "./controller/task/get-tasks";
import { deleteTask } from "./controller/task/delete-task";
import { updateTask } from "./controller/task/update-task";
import { updateTaskStatus } from "./controller/task/update-task-status";
import { updateTaskPriority } from "./controller/task/update-task-priority";

const router: Router = Router();

router.post("/users", register)
router.post("/sessions", authenticate)

// Protected routes
router.get("/profile", verifyJwt, profile)
router.post("/tasks", verifyJwt, createTask)
router.get("/tasks", verifyJwt, getTasks)
router.delete("/tasks/:taskId", verifyJwt, deleteTask)
router.put('/tasks/:taskId', verifyJwt, updateTask);
router.patch('/tasks/:taskId/status', verifyJwt, updateTaskStatus);
router.patch('/tasks/:taskId/priority', verifyJwt, updateTaskPriority);

export default router