import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const getMaterial = async (req,res) =>{
    try {
        const id = req.params.idMaterial;
        const [rows] = await pool.query(`SELECT
            ecodMaterial as idMaterial,
            tNombre as nameMaterial
        FROM catmateriales
        WHERE ecodMaterial = ?`,[id]);
        return res.json(rows);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        });
    }
}