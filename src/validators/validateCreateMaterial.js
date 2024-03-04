import { check, validationResult } from "express-validator";
const validateCreateMaterial =[
    check('nameMaterial')
        .exists()
        .notEmpty().withMessage("The nameMaterial field is required"),
];
export { validateCreateMaterial };