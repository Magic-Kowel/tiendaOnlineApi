import { Router } from "express";
import { getGenders } from "../controllers/gender/getGenders.js";
import verifyToken from "../libs/verifyToken.js";
const router = Router();
router.get("/genders",getGenders);
export default router;