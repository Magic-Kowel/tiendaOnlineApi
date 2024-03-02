import { Router } from "express";
import multer from 'multer';
import { createProduct } from "../controllers/product/createProduct.controller.js";
import verifyToken from "../libs/verifyToken.js";
import { getProduct } from "../controllers/product/getProduct.controller.js";
import { validateCreate,handleValidationCreate } from "../validators/validateCreateProduct.js";
const router = Router();
try {
    // const storage = multer.memoryStorage(); // Para almacenar el archivo en la memoria (buffer)
    const upload = multer({ dest: "files" });
    router.post("/product",
        verifyToken,
        upload.array('files', 10),
        validateCreate,
        handleValidationCreate,
        createProduct
    );
    router.get("/products", getProduct);
} catch (error) {
    console.error(error);
}

export default router;