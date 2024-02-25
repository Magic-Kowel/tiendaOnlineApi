import { Router } from "express";
import { ageGroups } from "../controllers/ageGroups/ageGroups.js";
import verifyToken from "../libs/verifyToken.js";
const router = Router();
try {
    router.get("/agegroups",verifyToken,ageGroups);
} catch (error) {
    console.log(error);
}
export default router;