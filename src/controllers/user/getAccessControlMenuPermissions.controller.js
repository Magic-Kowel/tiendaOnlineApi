import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const getAccessControlMenuPermissions = async (req,res) =>{
    try {
        const typeUser = req.params.typeUser;
        const [rows] = await pool.query(`SELECT
        ecodRelTipoUsuarioMenu as idPermission,
        reltipousuariomenu.ecodTipoUsuarioPermiso as idMenuPermission,
        catpermisos.tNombre as permission
    FROM 
        catsubmenu
    INNER JOIN reltipousuariopermisos
        ON reltipousuariopermisos.ecodSubmenu = catsubmenu.ecodSubmenu
    INNER JOIN reltipousuariomenu
        ON reltipousuariomenu.ecodTipoUsuarioPermiso = reltipousuariopermisos.ecodRelTipoUsuarioPermiso
    INNER JOIN catpermisos
        ON catpermisos.ecodPermiso =  reltipousuariopermisos.ecodPermiso
    INNER JOIN cattipousuario
        ON cattipousuario.ecodTipoUsuario = reltipousuariomenu.ecodTipoUsuario
        WHERE cattipousuario.ecodTipoUsuario = ?`,[typeUser]);
        res.json(rows);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        })
    }
}