import { check, validationResult } from "express-validator";
const validateCreate =[
    check('nameProduct')
        .exists()
        .notEmpty().withMessage("The nameProduct field is required"),
    check('description')
        .exists()
        .notEmpty().withMessage("The description field is required"),
    check('idSubCategory')
        .exists()
        .notEmpty().withMessage("The idSubCategory field is required"),
    check('idMaterial')
        .exists()
        .notEmpty().withMessage("The idMaterial field is required"),
    check('idGender')
        .exists()
        .notEmpty().withMessage("The idGender field is required"),
    check('files'),
    check('imageUrls')
        .exists()
        .notEmpty().withMessage("The imageUrls field is required"),
    check('sizesList')
        .exists()
        .notEmpty().withMessage("The sizesList field is required")
];
const handleValidationCreate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next(); // Continúa si no hay errores de validación
};

export { validateCreate, handleValidationCreate };