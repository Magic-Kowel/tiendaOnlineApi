import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
import { STATUS_USER_ACTIVE } from "../../config.js";
export const getMaterials = async (req,res) =>{
    try {
        const [rows] = await pool.query(`SELECT
            ecodMaterial as idMaterial,
            tNombre as nameMaterial
            FROM catmateriales
            WHERE ecodEstatus = ?
        `,[STATUS_USER_ACTIVE]);
        return res.json(rows);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        });
    }
}