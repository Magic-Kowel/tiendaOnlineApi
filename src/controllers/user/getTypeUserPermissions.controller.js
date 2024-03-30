import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
import { STATUS_USER_ACTIVE } from "../../config.js";
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const getTypeUserPermissions = async (req,res) =>{
    try {
        const id = req.params.idTypeUser
        console.log(id);
        const [rows] = await pool.query(`
        SELECT 
            catsubmenu.ecodSubmenu as id,
            catsubmenu.tNombre as name,
            catsubmenu.tUrl as url,
            catestatus.tNombre as status,
            catmenu.tNombre as Menu,
            catsubmenu.icon as icon
        FROM catsubmenu
        INNER JOIN catestatus
        on catsubmenu.ecodEstatus = catestatus.ecodEstatus
        JOIN catmenu
        on catmenu.ecodMenu = catsubmenu.ecodMenu
        INNER JOIN reltipousuariopermisos
        on reltipousuariopermisos.ecodSubmenu = catsubmenu.ecodSubmenu
        WHERE catmenu.ecodEstatus = ?
        AND reltipousuariopermisos.ecodTipoUsuario = ?
        ;
        `,[STATUS_USER_ACTIVE,id]);
        res.json(rows);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        })
    }
}