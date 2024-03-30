import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const getAccessControl = async (req,res) =>{
    try {
        const [rows] = await pool.query(`SELECT 
        reltipousuariopermisos.ecodRelTipoUsuarioPermiso as idMenuPermission,
        catsubmenu.tNombre as submenu,
        catpermisos.tNombre as permission
    FROM catsubmenu
    INNER JOIN reltipousuariopermisos
    on reltipousuariopermisos.ecodSubmenu = catsubmenu.ecodSubmenu
    LEFT JOIN catpermisos
    on catpermisos.ecodPermiso = reltipousuariopermisos.ecodPermiso`);
        res.json(rows);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        })
    }
}