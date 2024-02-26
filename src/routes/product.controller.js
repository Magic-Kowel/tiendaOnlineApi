import { Router } from "express";

import { createProduct } from "../controllers/product/createProduct.controller.js";
import verifyToken from "../libs/verifyToken.js";
const router = Router();
try {
    router.post("/product",verifyToken,createProduct);
} catch (error) {
    console.error(error);
}

export default router;