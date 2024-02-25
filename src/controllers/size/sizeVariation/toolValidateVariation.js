import { STATUS_USER_ACTIVE } from "../../../config.js";
import { pool } from "../../../db.js";
import logger from "../../../libs/logger.js";
export const toolValidateVariation = async ({
    idSize,
    idAgeGroup,
    STATUS_USER_ACTIVE
}) =>{
    try {
        const [rows] = await pool.query(`SELECT ecodTalla, ecodGrupoetario, COUNT(*) as cantidad
        FROM tallavariacion
        WHERE ecodTalla = ? 
        AND ecodGrupoetario = ?
        AND ecodEstatus = ?
        GROUP BY ecodTalla, ecodGrupoetario
        HAVING cantidad > 0;`,[
            idSize,
            idAgeGroup,
            STATUS_USER_ACTIVE
        ]);
        return rows.length
    } catch (error) {
        console.error(error);
        logger.error(error);
        return error
    }
}