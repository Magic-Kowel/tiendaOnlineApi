import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const getMenu = async (req,res) =>{
    const {idUser} = req.body;
    try {
        const [rows] = await pool.query(`
        SELECT 
            catmenu.ecodMenu as idMenu,
            catsubmenu.ecodSubmenu as idItemMenu,
            catsubmenu.tNombre as itemMenu,
            catsubmenu.tUrl as url,
            catestatus.tNombre as status,
            catmenu.tNombre as Menu,
            catsubmenu.icon as icon
        FROM catsubmenu
        INNER JOIN catestatus
        on catsubmenu.ecodEstatus = catestatus.ecodEstatus
        JOIN catmenu
        on catmenu.ecodMenu =catsubmenu.ecodMenu;
        `,[idUser]);
        res.json(rows);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        })
    }
}