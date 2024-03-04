import { check, validationResult } from "express-validator";
const validateCreateProduct =[
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
    check('imageUrls')
        .exists()
        .notEmpty().withMessage("The imageUrls field is required"),
    check('sizesList')
        .exists()
        .notEmpty().withMessage("The sizesList field is required")
];
export { validateCreateProduct };