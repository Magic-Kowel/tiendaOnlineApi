import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getMenu = async (req,res) =>{
    const id = req.params.id;
    try {
        const [rows] = await pool.query(`SELECT 
        ecodMenu as idMenu,
        tNombre as name,
        ecodEstatus as idStatus
        FROM catmenu
        where ecodMenu = ?
        `,[id]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}