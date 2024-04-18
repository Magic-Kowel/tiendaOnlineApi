import { check } from "express-validator";
const validateUpdateAdmin =[
    check('idUser')
        .exists()
        .notEmpty().withMessage("The name field is required"),
    check('nameUser')
        .exists()
        .notEmpty().withMessage("The name field is required"),
    check('lastName')
        .exists()
        .notEmpty().withMessage("The url field is required"),
    check('email')
        .exists()
        .isEmail()
        .notEmpty().withMessage("The status field is required"),
    check('birthdate')
        .exists()
        .notEmpty().withMessage("The idMenu field is required"),
    check('statusCheck')
        .exists()
        .isBoolean()
        .withMessage("The statusCheck field is required"),
];
export { validateUpdateAdmin };