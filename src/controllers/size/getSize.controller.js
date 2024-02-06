import { STATUS_USER_ACTIVE } from "../../config.js";
import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getSize = async (req,res) =>{
    try {
        const id = req.params.idSize;
        const [rows] = await pool.query(`SELECT 
            ecodTalla as idSize,
            tTalla as nameSize,
            ecodEstatus as status
        FROM talla
        WHERE ecodTalla = ?;`,[id]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}