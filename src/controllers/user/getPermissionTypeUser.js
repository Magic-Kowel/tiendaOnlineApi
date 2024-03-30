import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
    export const getPermissionTypeUser = async (req,res) =>{
        try {
            const idTypeUserPermission = req.params.idTypeUserPermission;
            const [rows] = await pool.query(`SELECT 
            reltipousuariopermisos.ecodRelTipoUsuarioPermiso as idTypeUserPermission,
            reltipousuariopermisos.ecodPermiso as idPermission,
            reltipousuariopermisos.ecodSubmenu as idSubmenu,
            catpermisos.tNombre as namePermission,
            catsubmenu.tNombre as nameSubmenu
            FROM reltipousuariopermisos
            INNER JOIN catpermisos
            on catpermisos.ecodPermiso = reltipousuariopermisos.ecodPermiso
            INNER JOIN catsubmenu
            on catsubmenu.ecodSubmenu = reltipousuariopermisos.ecodSubmenu
            WHERE reltipousuariopermisos.ecodRelTipoUsuarioPermiso = ?
            `,[idTypeUserPermission]);
            res.json(rows);
        } catch (error) {
            logger.error(error);
            return res.status(500).json({
                message: ERROR_MESSAGE_GENERIC
        })

    }
}