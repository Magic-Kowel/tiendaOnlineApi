import { Router } from "express";
import multer from 'multer';
import { createProduct } from "../controllers/product/createProduct.controller.js";
import verifyToken from "../libs/verifyToken.js";
import { getProduct } from "../controllers/product/getProduct.controller.js";
import { deleteProduct } from "../controllers/product/deleteProduct.controller.js";
import { validateCreateProduct } from "../validators/validateCreateProduct.js";
import { handleValidationErrors } from "../libs/handleValidationErrors.js";
const router = Router();
try {
    const upload = multer({ dest: "files" });
    router.post("/product",
        verifyToken,
        upload.array('files', 10),
        validateCreateProduct,
        handleValidationErrors,
        createProduct
    );
    router.delete("/product/:idProduct",verifyToken,deleteProduct);
    router.get("/products", getProduct);
} catch (error) {
    console.error(error);
}

export default router;