import { Router } from "express";
import { register } from "./controller/register";
import { authenticate } from "./controller/authenticate";

const router: Router = Router();

router.post("/users", register)
router.post("/sessions", authenticate)

export default router