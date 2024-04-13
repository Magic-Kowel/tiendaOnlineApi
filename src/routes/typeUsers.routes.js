import { Router } from "express";
import { getTypesUsers } from "../controllers/typeUser/getTypesUsers.js";
import verifyToken from "../libs/verifyToken.js";
const router = Router();
try {
    router.get("/type/users",verifyToken,getTypesUsers);
} catch (error) {
    console.log(error);
}
export default router;