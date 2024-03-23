import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import bcrypt from "bcryptjs";
import { SUCCESS_MESSAGE_UPDATE, PASSWORDS_DO_NOT_MATCH } from "../../messagesSystem.js";
export const resetPasswort = async(req,res)=>{
    try {
        const {
            idUser,
            password,
            password2
        } = req.body;
        const salt = await bcrypt.genSalt(10);
        const passwordEncript = await bcrypt.hash(password, salt);
        const [result] = await pool.query(`UPDATE catusuarios 
        SET tPassword = IFNULL(?,tPassword)
        WHERE ecodUsuario = ?`,
        [
            passwordEncript,
            idUser
        ]);
        if(result.affectedRows > 0){
            return res.status(200).json({
                updated:true,
                message:SUCCESS_MESSAGE_UPDATE
            });
        }
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        })
    }
}