import { Router } from "express";
//sizes
import { getSizes } from "../controllers/size/getSizes.controller.js";
import { getSize } from "../controllers/size/getSize.controller.js";
import { createSize } from "../controllers/size/createSize.controller.js";
import { deleteSize } from "../controllers/size/deleteSize.controller.js";
import { updateSize } from "../controllers/size/updateSize.controller.js";
//sizevariation
import { createSizeVariation } from "../controllers/size/sizeVariation/createSizevariation.controller.js";
import { getSizesVariation } from "../controllers/size/sizeVariation/getSizesVariation.controller.js";
import { getSizeVariation } from "../controllers/size/sizeVariation/getSizeVariation.controller.js";

import { deleteSizeVariation } from "../controllers/size/sizeVariation/deleteSizeVariation.controller.js";
import { updateSizeVariation } from "../controllers/size/sizeVariation/updateSizeVariation.controller.js";
import { validateVariation } from "../controllers/size/sizeVariation/validateVariation.controller.js";
import { getOpcionsSizesVariation } from "../controllers/size/sizeVariation/getOpcionsSizesVariation.controller.js";
import { getSizeVariationProdruct } from "../controllers/size/sizeVariation/getSizeVariationProdruct.controller.js";
import verifyToken from "../libs/verifyToken.js";
//validations 
import { validateCreateSize } from "../validators/validateCreateSize.js";
import { validateUpdateSize } from "../validators/validateUpdateSize.js";
import {handleValidationErrors} from "../libs/handleValidationErrors.js"
const router = Router();
try {
    //routes sizes
    router.get("/sizes",verifyToken,getSizes);
    router.get("/size/:idSize",verifyToken,getSize);
    router.post("/size",verifyToken,validateCreateSize,handleValidationErrors,createSize);
    router.delete("/size/:idSize",deleteSize);
    router.patch("/size",validateUpdateSize,handleValidationErrors,updateSize);
    // routes createSizeVariation
    router.post("/size/variation",verifyToken,createSizeVariation,handleValidationErrors);
    router.post("/size/variation/validate",verifyToken,validateVariation);
    router.get("/sizes/variation",verifyToken,getSizesVariation);
    router.get("/size/variation/:idSizeVariation",verifyToken,getSizeVariation);
    router.get("/size/variation/prodruct/:idProduct",getSizeVariationProdruct);
    router.delete("/size/variation/:idSizeVariation",verifyToken,deleteSizeVariation);
    router.patch("/size/variation",verifyToken,updateSizeVariation);
    router.get("/size/opcions/variation",verifyToken,getOpcionsSizesVariation);
} catch (error) {
    console.error(error);
}

export default router;