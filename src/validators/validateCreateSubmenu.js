import { check } from "express-validator";
const validateCreateSubmenu =[
    check('name')
        .exists()
        .notEmpty().withMessage("The name field is required"),
    check('url')
        .exists()
        .notEmpty().withMessage("The url field is required"),
    check('status')
        .exists()
        .notEmpty().withMessage("The status field is required"),
    check('idMenu')
        .exists()
        .notEmpty().withMessage("The idMenu field is required"),
];
export { validateCreateSubmenu };