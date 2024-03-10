import { check } from "express-validator";
const validateCreateSize =[
    check('nameSize')
        .exists()
        .notEmpty().withMessage("The nameSize field is required"),
];
export { validateCreateSize };