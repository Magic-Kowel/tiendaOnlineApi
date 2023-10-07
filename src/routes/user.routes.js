import { Router } from "express";

import { getUsers } from "../controllers/user/getUsers.controller.js";
import { getUser }  from "../controllers/user/getUser.controllerjs.js";
import { validateEmail } from "../controllers/user/validateEmail.controller.js";
import { createUser } from "../controllers/user/createUser.controller.js";
const router = Router();
router.get('/users',getUsers);
router.get('/user/:uid',getUser );
router.get('/user/email/:email',validateEmail);
router.post('/user',createUser);
export default router;