import { Router } from "express";
import verifyToken from "../libs/verifyToken.js";
import { getUsers } from "../controllers/user/getUsers.controller.js";
import { getTypeUsers } from "../controllers/user/getTypeUsers.controller.js";
import { getUser }  from "../controllers/user/getUser.controllerjs.js";
import { getUserProcess } from "../controllers/user/getUserProcess.controllerjs.js";
import { validateEmail } from "../controllers/user/validateEmail.controller.js";
import { validateEmailExist } from "../controllers/user/validateEmailExist.controller.js";
import { createUser } from "../controllers/user/createUser.controller.js";
import { validaeUser } from "../controllers/user/validaeUser.controller.js";
import { updateUser } from "../controllers/user/updateUser.js";
import { login } from "../controllers/user/login.controller.js";
import { getMenu } from "../controllers/user/getMenu.controller.js";
import { createUserAdmin } from "../controllers/user/createUserAdmin.controller.js";
import { deleteUser } from "../controllers/user/deleteUser.js";
import { handleValidationErrors } from "../libs/handleValidationErrors.js";
import { sendResetPasswort } from "../controllers/user/sendResetPasswort.controller.js";
import { resetPasswort } from "../controllers/user/resetPasswort.controller.js";
//validates
import { validateCreateUserAdmin } from "../validators/validateCreateUserAdmin.js";
import { validateUpdateAdmin } from "../validators/validateUpdateAdmin.js";
import { validateSendEmailResetPasswort } from "../validators/validateSendEmailResetPasswort.js";
import { validateResetPasswort } from "../validators/validateResetPasswort.js";
const router = Router();
router.get('/users',getUsers);
router.get('/users/types',getTypeUsers);
router.put('/user/validate',validaeUser);
router.get('/user/:idUser',getUser);
router.get('/user/process/:idUser',getUserProcess);
router.get('/user/email/:email',validateEmail);
router.get('/user/email/:email/:idUser',validateEmailExist);
router.post('/user',createUser);
router.post('/login',login);
router.post('/user/menu',getMenu)
router.patch('/user/admind',
    verifyToken,
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
router.post('/user/send/reset/passwort',
    verifyToken,
    validateSendEmailResetPasswort,
    handleValidationErrors,
    sendResetPasswort
);
router.patch('/user/reset/passwort',
    validateResetPasswort,
    handleValidationErrors,
    resetPasswort
);
router.delete('/user/delete/:idUser',verifyToken,deleteUser);
export default router;