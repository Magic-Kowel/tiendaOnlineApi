import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
import { STATUS_USER_ACTIVE } from "../../config.js";
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const getMenu = async (req,res) =>{
    try {
        const [rows] = await pool.query(`
        SELECT DISTINCT
            catmenu.ecodMenu AS idMenu,
            catsubmenu.ecodSubmenu AS idItemMenu,
            catsubmenu.tNombre AS itemMenu,
            catsubmenu.tUrl AS url,
            catestatus.tNombre AS status,
            catmenu.tNombre AS Menu,
            catsubmenu.icon AS icon
        FROM 
            catsubmenu
        INNER JOIN 
            catestatus ON catsubmenu.ecodEstatus = catestatus.ecodEstatus
        INNER JOIN 
            catmenu ON catmenu.ecodMenu = catsubmenu.ecodMenu
        INNER JOIN reltipousuariopermisos
            ON reltipousuariopermisos.ecodSubmenu = catsubmenu.ecodSubmenu
        INNER JOIN reltipousuariomenu
            ON reltipousuariomenu.ecodTipoUsuarioPermiso = reltipousuariopermisos.ecodRelTipoUsuarioPermiso
        WHERE catmenu.ecodEstatus = ?
        ;
        `,[STATUS_USER_ACTIVE]);
        res.json(rows);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        })
    }
}