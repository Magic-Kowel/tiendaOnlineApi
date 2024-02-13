import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const getSubMenus = async (req,res) =>{
    try {
        const [rows] = await pool.query(`
        SELECT 
            catsubmenu.ecodSubmenu as idSubMenu,
            catsubmenu.tNombre as name,
            catsubmenu.tUrl as url,
            catsubmenu.ecodCreacion as idUser,
            catsubmenu.fhCreacion,
            catestatus.tNombre as status,
            catmenu.tNombre as nameMenu,
            catsubmenu.ecodEdicion,
            catsubmenu.fhEdicion
        FROM catsubmenu
        INNER JOIN catestatus
        on catsubmenu.ecodEstatus = catestatus.ecodEstatus
        INNER JOIN catmenu
        on catmenu.ecodMenu =catsubmenu.ecodMenu;`);
        res.json(rows);
    } catch (error) {
        console.log(error);
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        });
    }
}