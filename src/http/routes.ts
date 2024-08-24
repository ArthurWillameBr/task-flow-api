import { Router } from "express";
import { register } from "./controller/register";
import { authenticate } from "./controller/authenticate";
import { profile } from "./controller/profile";
import { verifyJwt } from "./middleware/verify-jwt";

const router: Router = Router();

router.post("/users", register)
router.post("/sessions", authenticate)

router.get("/profile", verifyJwt, profile)

export default router