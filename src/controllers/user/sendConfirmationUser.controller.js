import logger from "../../libs/logger.js";
import { pool } from "../../db.js";
import { BASE_URL_FRONT } from "../../config.js";
import { ERROR_MESSAGE_GENERIC, SUCCESS_MESSAGE_EMAIL_SENDED } from "../../messagesSystem.js";
import { sendEmailVerifyUser } from "../../libs/email/sendEmailVerifyUser.js";
export const sendConfirmationUser = async (req,res) =>{
    try {
        const {
            idUser,
        } = req.body;        
        const [result] = await pool.query(`SELECT 
        tCorreo,
        tNombre as nameUser,
        tApellido as lastName
        FROM catusuarios 
        WHERE ecodUsuario = ?`,
        [
            idUser
        ]);
        
            const emailObject={
                email:result[0].tCorreo,
                subject:'Verificación de correo electrónico',
                data:{
                  url:`${BASE_URL_FRONT}/user/validate/${idUser}`,
                  name:`${result[0].nameUser} ${result[0].lastName}`,
                  pass:""
                }
            }
            const send = sendEmailVerifyUser(emailObject);
            console.log(send);
            return res.status(200).json({
                send:true,
                message:SUCCESS_MESSAGE_EMAIL_SENDED
            });
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        })
    }
}