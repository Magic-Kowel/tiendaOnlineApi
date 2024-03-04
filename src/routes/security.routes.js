import { Router } from "express";
import { getStatus } from "../controllers/status/getStatus.controller.js";
import { createMenu } from "../controllers/menu/createMenu.controller.js";
import { getMenus } from "../controllers/menu/getMenus.js";
import { getMenu } from "../controllers/menu/getMenu.js";
import { getMenusActive } from "../controllers/menu/getMenusActive.js";
import { updateMenu } from "../controllers/menu/updateMenu.controller.js";
import { validateCreateMenu } from "../validators/validateCreateMenu.js";
import { validateUpdateMenu } from "../validators/validateUpdateMenu.js";
import { handleValidationErrors } from "../libs/handleValidationErrors.js";
//submenu
import { getSubMenus } from "../controllers/subMenu/getSubMenus.js";
import { getSubMenusActive } from "../controllers/subMenu/getSubMenusActive.js";
import { createSubMenu } from "../controllers/subMenu/createSubMenu.js";
import { getSubMenu } from "../controllers/subMenu/getSubMenu.js";
import { updateSubMenu } from "../controllers/subMenu/updateSubMenu.js";
//verifi token
import verifyToken from "../libs/verifyToken.js";
const router = Router();
router.get("/status",verifyToken,getStatus);
router.post("/menu",verifyToken,validateCreateMenu,handleValidationErrors,createMenu);
router.patch("/menu",verifyToken,validateUpdateMenu,handleValidationErrors,updateMenu);
router.get("/menus",verifyToken,getMenus);
router.get("/menus/active",verifyToken,getMenusActive);
router.get("/menu/:id",verifyToken,getMenu);
//submenu
router.get("/submenu/:id",verifyToken,getSubMenu);
router.get("/submenus",verifyToken,getSubMenus);
router.get("/submenus/active",verifyToken,getSubMenusActive);
router.post("/submenu",verifyToken,createSubMenu);
router.patch("/submenu",verifyToken,updateSubMenu);
export default router;