import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const getStatus = async (req,res) =>{
    try {
        const [rows] = await pool.query(`SELECT 
        ecodEstatus as id,
        tNombre as name
        FROM catestatus`);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        logger.error(error)
        req.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        })
    }
}