import { Router } from "express";
import { ageGroups } from "../controllers/ageGroups/ageGroups.js";
import verifyToken from "../libs/verifyToken.js";
const router = Router();
router.get("/agegroups",verifyToken,ageGroups);
export default router;