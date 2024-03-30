import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import {
    ERROR_MESSAGE_GENERIC
} from "../../messagesSystem.js";
import { SUCCESS_MESSAGE_UPDATE } from "../../messagesSystem.js";
export const updatePermissionTypeUser = async (req,res) =>{
    try {
        const {idSubmenu,idTypeUserPermission} = req.body;
        const [result] = await pool.query(`UPDATE 
        reltipousuariopermisos 
        SET ecodSubmenu = IFNULL(?,ecodSubmenu)
        WHERE ecodRelTipoUsuarioPermiso = ?`,
        [
            idSubmenu,idTypeUserPermission
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
            message: ERROR_MESSAGE_GENERIC
        })
    }
}