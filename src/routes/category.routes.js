import { Router } from "express";
import { createCategory } from "../controllers/category/createCategory.conroller.js";
import { getCategories } from "../controllers/category/getCategories.controller.js";
import { deleteCategory } from "../controllers/category/deleteCategory.conroller.js";
import { getCategory } from "../controllers/category/getCategory.conttroller.js";
import { updateCategory } from "../controllers/category/updateCategory.controller.js";
import verifyToken from "../libs/verifyToken.js";
const router = Router();
router.post("/category",verifyToken,createCategory);
router.get("/categories",getCategories);
router.get("/category/:idCategory",getCategory);
router.delete('/category/:idCategory',verifyToken,deleteCategory);
router.patch("/category",verifyToken,updateCategory);
export default router;