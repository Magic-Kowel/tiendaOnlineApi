import { Router } from "express";
import multer from 'multer';
import { createProduct } from "../controllers/product/createProduct.controller.js";
import verifyToken from "../libs/verifyToken.js";
import { getProducts } from "../controllers/product/getProducts.controller.js";
import { getProduct } from "../controllers/product/getProduct.controller.js";
import { deleteProduct } from "../controllers/product/deleteProduct.controller.js";
import { updateProduct } from "../controllers/product/updateProduct.controller.js";
import { getImagesProdruct } from "../controllers/product/getImagesProdruct.controller.js";
import { validateCreateProduct } from "../validators/validateCreateProduct.js";
import { handleValidationErrors } from "../libs/handleValidationErrors.js";
import { deleteImagenProduct } from "../controllers/product/deleteImagenProduct.js";
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
    router.patch("/product",
        verifyToken,
        upload.array('files', 10),
        updateProduct
    );
    router.delete("/product/:idProduct",verifyToken,deleteProduct);
    router.delete("/product/imagen/:idImagen",verifyToken,deleteImagenProduct);
    router.get("/products", getProducts);
    router.get("/product/:idProduct", getProduct);
    router.get("/product/imagens/:idProduct", getImagesProdruct);

} catch (error) {
    console.error(error);
}

export default router;