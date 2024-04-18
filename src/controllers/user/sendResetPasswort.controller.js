import logger from "../../libs/logger.js";
import { pool } from "../../db.js";
import { STATUS_USER_ACTIVE, BASE_URL_FRONT } from "../../config.js";
import { 
    FORM_SUBMITTED_SUCCESSFULLY,
    ERROR_MESSAGE_GENERIC,
    NOT_IS_ACTIVE_USER  
} from "../../messagesSystem.js";
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
        if(row.length === 0){
            return res.status(400).json({
                notActiveUser:true,
                message: NOT_IS_ACTIVE_USER
            });
        }
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
        console.log(response);
        res.status(200).json({
            send:true,
            message:FORM_SUBMITTED_SUCCESSFULLY
        });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        });
    }
}