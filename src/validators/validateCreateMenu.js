import { check, validationResult } from "express-validator";
const validateCreateMenu =[
    check('name')
        .exists()
        .notEmpty().withMessage("The name field is required"),
    check('idUser')
        .exists()
        .notEmpty().withMessage("The idUser field is required"),
    check('status')
        .exists()
];
export { validateCreateMenu };