import { STATUS_USER_ACTIVE } from "../../../config.js";
import { pool } from "../../../db.js";
import logger from "../../../libs/logger.js";
export const getSizeVariation = async (req,res) =>{
    try {
        const id = req.params.idSizeVariation;
        const [rows] = await pool.query(`SELECT
            tallavariacion.ecodTallavariacion as idSizeVariation,
            talla.tTalla as nameSize,
            talla.ecodTalla as idSize,
            grupoetario.tNombre as ageGroup,
            grupoetario.ecodGrupoetario as idAgeGroup,
            catestatus.tNombre as status,
            nEdadMinima as minAge,
            nEdadMaxima as maxAge
        FROM tallavariacion
        INNER JOIN talla
        on talla.ecodTalla = tallavariacion.ecodTalla
        INNER JOIN grupoetario
        on grupoetario.ecodGrupoetario = tallavariacion.ecodGrupoetario
        INNER JOIN catestatus
        on catestatus.ecodEstatus = tallavariacion.ecodEstatus
        WHERE tallavariacion.ecodTallavariacion=? 
        AND catestatus.ecodEstatus = ?;`,[id,STATUS_USER_ACTIVE]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}