import logger from "../../libs/logger.js"
import { pool } from "../../db.js";
import { SUCCESS_MESSAGE_UPDATE } from "../../messagesSystem.js";
import { STATUS_USER_DELETE,STATUS_USER_ACTIVE } from "../../config.js";
export const updateUser = async (req,res) =>{
    try {
        const {
            idUser,
            nameUser,
            lastName,
            email,
            idTypeUser,
            birthdate,
            statusCheck
        } = req.body;
        const [result] = await pool.query(`UPDATE 
        catusuarios 
        SET tNombre = IFNULL(?,tNombre),
        tApellido = IFNULL(?,tApellido),
        tCorreo = IFNULL(?,tCorreo),
        ecotTipoUsaurio = IFNULL(?,ecotTipoUsaurio),
        fhNacimiento = IFNULL(?,fhNacimiento),
        ecodEstatus = IFNULL(?,ecodEstatus)
        WHERE ecodUsuario = ?`,
        [
            nameUser,
            lastName,
            email,
            idTypeUser,
            birthdate,
            statusCheck?STATUS_USER_ACTIVE:STATUS_USER_DELETE,
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