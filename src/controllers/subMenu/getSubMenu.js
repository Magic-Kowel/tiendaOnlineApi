import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const getSubMenu = async (req,res) =>{
    try {
        const id = req.params.id;
        const [rows] = await pool.query(`
        SELECT 
            ecodSubmenu as idSubMenu,
            catsubmenu.tNombre as name,
            tUrl as url,
            ecodEstatus as status,
            ecodMenu as idMenu,
            icon
        FROM catsubmenu
        WHERE ecodSubmenu = ?`,[id]);
        res.json(rows);
    } catch (error) {
        console.log(error);
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        });
    }
}