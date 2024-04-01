import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const permissionsTypeUserLogin = async (req,res) =>{
    try {
        const typeUser = req.params.typeUser;
        const [rows] = await pool.query(`SELECT 
            catpermisos.tNombre as permission
        FROM catsubmenu
        INNER JOIN reltipousuariopermisos
        on reltipousuariopermisos.ecodSubmenu = catsubmenu.ecodSubmenu
        INNER JOIN catpermisos
        on catpermisos.ecodPermiso = reltipousuariopermisos.ecodPermiso
        INNER JOIN reltipousuariomenu
        on reltipousuariomenu.ecodTipoUsuarioPermiso = reltipousuariopermisos.ecodRelTipoUsuarioPermiso
        INNER JOIN cattipousuario
        on cattipousuario.ecodTipoUsuario = reltipousuariomenu.ecodTipoUsuario
        WHERE cattipousuario.tNombre = ?
        `,[typeUser]);
        res.json(rows);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        })
    }
}