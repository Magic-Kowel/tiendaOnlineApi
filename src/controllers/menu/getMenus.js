import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getMenus = async (req,res) =>{
    try {
        const [rows] = await pool.query(`SELECT 
        ecodMenu as id,
        catmenu.tNombre as name,
        catestatus.tNombre as status
        FROM catmenu 
        inner join catestatus
        on catestatus.ecodEstatus = catmenu.ecodEstatus;`);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}