import { check } from "express-validator";
const validateSendEmailResetPasswort =[
    check('idUser')
        .exists()
        .notEmpty().withMessage("The idUser field is required"),
];
export { validateSendEmailResetPasswort };