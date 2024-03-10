import { check } from "express-validator";
const validateUpdateSize =[
    check('nameSize')
        .exists()
        .notEmpty().withMessage("The nameSize field is required"),
    check('idSize')
        .exists()
        .notEmpty().withMessage("The idSize field is required"),
];
export { validateUpdateSize };