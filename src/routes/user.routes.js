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
import { validateSendConfirmationUser } from "../validators/validateSendConfirmationUser.js";
//----
import { createPermissionsTypeUser } from "../controllers/user/createPermissionsTypeUser.controller.js";
import { getTypeUserPermissions } from "../controllers/user/getTypeUserPermissions.controller.js";
import { getAccessControl } from "../controllers/user/getAccessControl.controller.js";
import { getAccessControlMenu } from "../controllers/user/getAccessControlMenu.controller.js";
import { PermissionsTypeUser } from "../controllers/user/PermissionsTypeUser.js";
import { createAccessControlMenu } from "../controllers/user/createAccessControlMenu.controller.js";
import { getAccessControlMenuPermissions } from "../controllers/user/getAccessControlMenuPermissions.controller.js";
import { permissionsTypeUserLogin } from "../controllers/user/permissionsTypeUser.controller.js";

import { sendConfirmationUser } from "../controllers/user/sendConfirmationUser.controller.js";
const router = Router();
router.get('/users',getUsers);
router.get('/users/types',getTypeUsers);
router.put('/user/validate',validaeUser);
router.get('/user/:idUser',getUser);
router.get('/user/process/:idUser',getUserProcess);
router.get('/user/email/:email',validateEmail);
router.get('/user/type/permissions/:idTypeUser',verifyToken,getTypeUserPermissions);
router.get('/user/email/:email/:idUser',validateEmailExist);
router.post('/user',createUser);
router.post('/login',login);
router.post('/user/menu',getMenu);
router.get('/type/user/permissions',PermissionsTypeUser);
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

router.get('/user/access/control',verifyToken,getAccessControl);
router.get('/user/access/control/menu/:typeUser',verifyToken,getAccessControlMenu);
router.post('/user/permissions/type/user',verifyToken,createPermissionsTypeUser);
router.post('/user/access/control/menu',verifyToken,createAccessControlMenu);
router.get('/user/access/control/menu/permissions/:typeUser',verifyToken,getAccessControlMenuPermissions);
router.get('/user/access/permissions/login/:typeUser',verifyToken,permissionsTypeUserLogin);

router.post('/user/send/confirmation',
    validateSendConfirmationUser,
    handleValidationErrors,
sendConfirmationUser);


export default router;