import { check } from "express-validator";
const validateCreateUserAdmin =[
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
    check('birthDate')
        .exists()
        .notEmpty().withMessage("The idMenu field is required"),
];
export { validateCreateUserAdmin };