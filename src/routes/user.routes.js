import { Router } from "express";

import { getUsers } from "../controllers/user/getUsers.controller.js";
import { getUser }  from "../controllers/user/getUser.controllerjs.js";
import { validateEmail } from "../controllers/user/validateEmail.controller.js";
import { createUser } from "../controllers/user/createUser.controller.js";
import { validaeUser } from "../controllers/user/validaeUser.controller.js";
import { login } from "../controllers/user/login.controller.js";
import { getMenu } from "../controllers/user/getMenu.controller.js";
import { createViewUser } from "../controllers/user/createViewUser.js";
const router = Router();
router.get('/users',getUsers);
router.put('/user/validate',validaeUser);
router.get('/user/:uid',getUser );
router.get('/user/email/:email',validateEmail);
router.post('/user',createUser);
router.post('/login',login);
router.post('/user/menu',getMenu)
router.post('/user/view',createViewUser)
export default router;