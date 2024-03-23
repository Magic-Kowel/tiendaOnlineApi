import { check } from "express-validator";
const validateUpdateMenu =[
    check('name')
        .exists()
        .notEmpty().withMessage("The name field is required"),
    check('idMenu')
        .exists()
        .notEmpty().withMessage("The idMenu field is required"),
    check('status')
        .exists()
        .notEmpty().withMessage("The idMenu field is required"),
];
export { validateUpdateMenu };