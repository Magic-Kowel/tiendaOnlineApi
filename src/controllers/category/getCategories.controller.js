import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const getCategories = async (req,res) =>{
    try {
        const [rows] = await pool.query(`SELECT * FROM catcategoria
        where activo = 1`);
        return res.json(rows);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        });
    }
}