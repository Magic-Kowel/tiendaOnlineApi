import { pool } from "../../db.js";
import { uid } from "uid";
import logger from "../../libs/logger.js";
import { 
    SUCCESS_MESSAGE_INSERT,
    ERROR_MESSAGE_GENERIC
} from "../../messagesSystem.js";
export const createPermissionsTypeUser = async (req,res) =>{
    try {
        const {idUserPermissions,idSubmenu} = req.body;
        const idTypeUserPermissions = uid(32);
            const [row] = await pool.query(`insert into reltipousuariopermisos 
            (
                ecodRelTipoUsuarioPermiso,
                ecodSubmenu,
                ecodPermiso
            )
            VALUES(?,?,?)`,[ 
                idTypeUserPermissions,
                idSubmenu,
                idUserPermissions
                
            ]);
        return res.status(200).json({
            created:true,
            message:SUCCESS_MESSAGE_INSERT
        });
    } catch (error) {
        console.log(error);
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        });
    }
}