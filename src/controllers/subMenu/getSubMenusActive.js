import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { STATUS_USER_ACTIVE } from "../../config.js";
export const getSubMenusActive = async (req,res) =>{
    try {
        const [rows] = await pool.query(`SELECT 
        ecodSubmenu as id,
        tNombre as name,
        ecodEstatus as status
        FROM catsubmenu
        WHERE ecodEstatus = ?`,[STATUS_USER_ACTIVE]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}