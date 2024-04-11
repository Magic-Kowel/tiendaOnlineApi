import { check } from "express-validator";
const validateSendConfirmationUser =[
    check('idUser')
        .exists()
        .notEmpty().withMessage("The idUser field is required"),
];
export { validateSendConfirmationUser };