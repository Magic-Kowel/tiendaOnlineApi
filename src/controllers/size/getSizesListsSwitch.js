import { STATUS_USER_ACTIVE } from "../../config.js";
import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getSizesListsSwitch = async (req,res) =>{
    try {
        const [rows] = await pool.query(`SELECT 
            tTalla as sizeName 
        FROM talla
        WHERE ecodEstatus = ?;`,[STATUS_USER_ACTIVE]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}