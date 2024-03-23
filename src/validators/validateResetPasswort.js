import { check } from "express-validator";
import { PASSWORDS_DO_NOT_MATCH } from "../messagesSystem.js";
const validateResetPasswort =[
    check('idUser')
        .exists()
        .notEmpty().withMessage("The idUser field is required"),
    check('password')
        .exists()
        .notEmpty().withMessage("The password field is required"),
    check('password2')
        .exists()
        .notEmpty().withMessage("The password2 field is required"),
    check('password2').notEmpty().withMessage('The password2 field is required')
        .custom((value, { req }) => {
            // Comprueba si las dos variables son iguales
            if (value.trim() !== req.body.password.trim()) {
                return res.status(400).json({
                    updated:false,
                    message:SUCCESS_MESSAGE_UPDATE
                });; // Enviar un código de estado 400 (Bad Request)
            }
            return true; // Retorna true si la validación pasa
        })
];
export { validateResetPasswort };