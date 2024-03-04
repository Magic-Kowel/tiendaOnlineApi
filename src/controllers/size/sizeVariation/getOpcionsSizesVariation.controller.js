import { STATUS_USER_ACTIVE } from "../../../config.js";
import { pool } from "../../../db.js";
import logger from "../../../libs/logger.js";
export const getOpcionsSizesVariation = async (req,res) =>{
    try {
        const [rows] = await pool.query(`SELECT
        tallavariacion.ecodTallavariacion as idSizeVariation,
        talla.tTalla as nameSize,
        IF(grupoetario.tNombre = "Infantil", TRUE, FALSE) AS isChildren,
        grupoetario.tNombre as ageGroup,
        catestatus.tNombre as status,
        nEdadMinima as minAge,
        nEdadMaxima as maxAge,
        CONCAT(talla.tTalla, " ", grupoetario.tNombre, " ",
            CASE
               	WHEN (nEdadMinima = 0 or nEdadMinima is null )   AND (nEdadMaxima = 0 or nEdadMaxima is null)
               	THEN tallavariacion.nTalla
               	WHEN nEdadMinima IS NOT NULL AND nEdadMaxima IS NOT NULL 
                THEN CONCAT(nEdadMinima, "-", nEdadMaxima)
                ELSE ""
            END) as displaySize
        FROM tallavariacion
        INNER JOIN talla
            ON talla.ecodTalla = tallavariacion.ecodTalla
        INNER JOIN grupoetario
            ON grupoetario.ecodGrupoetario = tallavariacion.ecodGrupoetario
        INNER JOIN catestatus
            ON catestatus.ecodEstatus = tallavariacion.ecodEstatus
        WHERE catestatus.ecodEstatus = ?;`,[STATUS_USER_ACTIVE]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}