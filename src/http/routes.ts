import { Router } from "express";
import { register } from "./controller/user/register";
import { authenticate } from "./controller/user/authenticate";
import { profile } from "./controller/user/profile";
import { verifyJwt } from "./middleware/verify-jwt";
import { createTask } from "./controller/task/create-task";

const router: Router = Router();

router.post("/users", register)
router.post("/sessions", authenticate)

router.get("/profile", verifyJwt, profile)
router.post("/tasks", verifyJwt, createTask)

export default router