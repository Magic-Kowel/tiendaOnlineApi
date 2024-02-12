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
import { getSizeVariation } from "../controllers/size/sizeVariation/getSizevariation.controller.js";
import { deleteSizeVariation } from "../controllers/size/sizeVariation/deleteSizeVariation.controller.js";
import { updateSizeVariation } from "../controllers/size/sizeVariation/updateSizeVariation.controller.js";
import verifyToken from "../libs/verifyToken.js";
const router = Router();
//routes sizes
router.get("/sizes",verifyToken,getSizes);
router.get("/size/:idSize",verifyToken,getSize);
router.post("/size",verifyToken,createSize);
router.delete("/size/:idSize",deleteSize);
router.patch("/size",updateSize);
// routes createSizeVariation
router.post("/size/variation",verifyToken,createSizeVariation);
router.get("/sizes/variation",verifyToken,getSizesVariation);
router.get("/size/variation/:idSizeVariation",verifyToken,getSizeVariation);
router.delete("/size/variation/:idSizeVariation",verifyToken,deleteSizeVariation);
router.patch("/size/variation",verifyToken,updateSizeVariation);
export default router;