import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
import { STATUS_USER_ACTIVE } from "../../config.js";
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const getAccessControlMenu = async (req,res) =>{
    try {
        const typeUser = req.params.typeUser;
        const [rows] = await pool.query(`SELECT 
                    reltipousuariopermisos.ecodRelTipoUsuarioPermiso as idMenuPermission,
                    catsubmenu.tNombre as submenu,
                    catpermisos.tNombre as permission
                FROM catsubmenu
            INNER JOIN reltipousuariopermisos
            on catsubmenu.ecodSubmenu = reltipousuariopermisos.ecodSubmenu
            INNER JOIN catpermisos
            on reltipousuariopermisos.ecodPermiso = catpermisos.ecodPermiso
        `);
        res.json(rows);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        })
    }
}