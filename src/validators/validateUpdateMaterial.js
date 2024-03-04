import { check } from "express-validator";
const validateUpdateMaterial =[
    check('idMaterial')
        .exists()
        .notEmpty().withMessage("The idMaterial field is required"),
     check('nameMaterial')
        .exists()
        .notEmpty().withMessage("The nameMaterial field is required"),
];
export { validateUpdateMaterial };