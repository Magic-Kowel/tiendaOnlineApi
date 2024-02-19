import { STATUS_USER_ACTIVE } from "../../../config.js";
import { pool } from "../../../db.js";
import logger from "../../../libs/logger.js";
export const validateVariation = async (req,res) =>{
    try {
        const {idSize,idAgeGroup} = req.body;
        const [rows] = await pool.query(`SELECT ecodTalla, ecodGrupoetario, COUNT(*) as cantidad
        FROM tallavariacion
        WHERE ecodTalla = ? 
        AND ecodGrupoetario = ?
        AND ecodEstatus = ?
        GROUP BY ecodTalla, ecodGrupoetario
        HAVING cantidad > 1;`,[idSize,idAgeGroup,STATUS_USER_ACTIVE]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}