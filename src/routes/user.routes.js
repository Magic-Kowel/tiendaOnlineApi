import { Router } from "express";
import verifyToken from "../libs/verifyToken.js";
import { getUsers } from "../controllers/user/getUsers.controller.js";
import { getUser }  from "../controllers/user/getUser.controllerjs.js";
import { validateEmail } from "../controllers/user/validateEmail.controller.js";
import { validateEmailExist } from "../controllers/user/validateEmailExist.controller.js";
import { createUser } from "../controllers/user/createUser.controller.js";
import { validaeUser } from "../controllers/user/validaeUser.controller.js";
import { updateUser } from "../controllers/user/updateUser.js";
import { login } from "../controllers/user/login.controller.js";
import { getMenu } from "../controllers/user/getMenu.controller.js";
import { createUserAdmin } from "../controllers/user/createUserAdmin.controller.js";
import { createViewUser } from "../controllers/user/createViewUser.js";
import { deleteUser } from "../controllers/user/deleteUser.js";
import { validateCreateUserAdmin } from "../validators/validateCreateUserAdmin.js";
import { validateUpdateAdmin } from "../validators/validateUpdateAdmin.js";
import { handleValidationErrors } from "../libs/handleValidationErrors.js";
const router = Router();
router.get('/users',getUsers);
router.put('/user/validate',validaeUser);
router.get('/user/:uid',getUser );
router.get('/user/email/:email',validateEmail);
router.get('/user/email/:email/:idUser',validateEmailExist);
router.post('/user',createUser);
router.post('/login',login);
router.post('/user/menu',getMenu)
router.post('/user/view',createViewUser)
router.patch('/user/admind',
    validateUpdateAdmin,
    handleValidationErrors,
    updateUser
);
router.post('/user/admind',
    verifyToken,
    validateCreateUserAdmin,
    handleValidationErrors,
    createUserAdmin
);
router.delete('/user/delete/:idUser',verifyToken,deleteUser);
export default router;