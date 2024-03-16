import { pool } from "../../../db.js";
import logger from "../../../libs/logger.js";
import { STATUS_USER_ACTIVE } from "../../../config.js";
export const getSizeVariationProdruct = async (req,res) =>{
    try {
        const id = req.params.idProduct;
        const [rows] = await pool.query(`SELECT 
        relvariacionproducto.ecodVariacionproducto as idSizeVariationProduct,
		relvariacionproducto.ecodTallavariacion as idSizeVariation,
        nPrecio as price,
        nStock as stock,
        bPrincipal as isMain,
        tallavariacion.nEdadMinima as minAge,
        tallavariacion.nEdadMaxima as maxAge,
        talla.tTalla as nameSize,
        talla.ecodTalla as idSize,
        grupoetario.tNombre as ageGroup
        FROM relvariacionproducto
        RIGHT JOIN tallavariacion
        on tallavariacion.ecodTallavariacion = relvariacionproducto.ecodTallavariacion
        INNER JOIN talla 
		on talla.ecodTalla = tallavariacion.ecodTalla
        INNER JOIN grupoetario
		on grupoetario.ecodGrupoetario = tallavariacion.ecodGrupoetario
        INNER JOIN catestatus on catestatus.ecodEstatus = relvariacionproducto.ecodEstatus
        WHERE ecodProductos = ?
        AND catestatus.ecodEstatus = ?
    `,[id,STATUS_USER_ACTIVE]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}
