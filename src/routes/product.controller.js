import { Router } from "express";
import multer from 'multer';
import { createProduct } from "../controllers/product/createProduct.controller.js";
import verifyToken from "../libs/verifyToken.js";
const router = Router();
try {
    // const storage = multer.memoryStorage(); // Para almacenar el archivo en la memoria (buffer)
    const upload = multer({ dest: "files" });
    router.post("/product", upload.array('files', 10), createProduct);
} catch (error) {
    console.error(error);
}

export default router;