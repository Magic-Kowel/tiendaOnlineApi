import logger from "../../libs/logger.js";
import { pool } from "../../db.js";
import { STATUS_USER_ACTIVE, BASE_URL_FRONT } from "../../config.js";
import { FORM_SUBMITTED_SUCCESSFULLY,ERROR_MESSAGE_GENERIC  } from "../../messagesSystem.js";
import { sendEmailResetPasswort } from "../../libs/email/sendEmailResetPasswort.js";
export const sendResetPasswort = async (req,res)  =>{
    try {
        const {
            idUser    
        } = req.body;
        const [row] = await pool.query(`SELECT
            ecodUsuario as idUser,
            CONCAT(tNombre," ", tApellido) as fullName,
            tCorreo as email
        FROM catusuarios
        WHERE ecodEstatus = ? 
        AND ecodUsuario = ?
        `,[STATUS_USER_ACTIVE,idUser]);
        const emailObject={
            email:row[0].email,
            subject:'Restablecimiento de contraseña',
            data:{
                email:row[0].email,
                url:`${BASE_URL_FRONT}/user/reset/password/${idUser}`,
                name:row[0].fullName,
            }
        }
        const response = await sendEmailResetPasswort(emailObject);
        res.status(200).json({
            send:true,
            message:FORM_SUBMITTED_SUCCESSFULLY
        });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}