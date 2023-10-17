import { Router } from "express";
import { createCategory } from "../controllers/category/createCategory.conroller.js";

const router = Router();
router.post("/category",createCategory);
export default router;