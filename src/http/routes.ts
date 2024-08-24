import { Router } from "express";
import { register } from "./controller/register";

const router: Router = Router();

router.post("/users", register)

export default router