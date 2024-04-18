import { STATUS_USER_ACTIVE } from "../../config.js";
import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getTotalPagesProducts = async (req,res) =>{
    const pageSize=12;
    console.log("hola");
    try {
        let query = `
        SELECT CEIL(COUNT(*) / ?) AS total
            FROM (
                SELECT
                    catproductos.ecodProductos as idProduct,
                    catproductos.tNombre as nameProduct,
                    catmateriales.tNombre as nameMaterial,
                    GROUP_CONCAT(relproductoimagen.iImagen) as urlImagenes,
                    catproductos.Descripcion as description,
                    relvariacionproducto.nPrecio as price
                FROM
                    catproductos
                INNER JOIN
                    catmateriales ON catproductos.ecodMaterial = catmateriales.ecodMaterial
                LEFT JOIN
                    relproductoimagen ON catproductos.ecodProductos = relproductoimagen.ecodProductos
                INNER JOIN
                    relvariacionproducto ON catproductos.ecodProductos = relvariacionproducto.ecodProductos
                INNER JOIN 
                    tallavariacion ON tallavariacion.ecodTallavariacion = relvariacionproducto.ecodTallavariacion
                INNER JOIN 
                    talla ON talla.ecodTalla = tallavariacion.ecodTalla
                INNER JOIN
                    grupoetario ON tallavariacion.ecodGrupoetario = grupoetario.ecodGrupoetario
                INNER JOIN catgeneros
                    catgeneros ON catgeneros.ecodGenero= catproductos.ecodGenero
                WHERE
                    catproductos.ecodEstatus = ?
                GROUP BY
                    catproductos.ecodProductos
            ) AS subconsulta;
    `;
        const queryParams = [pageSize,STATUS_USER_ACTIVE];
        const [rows] = await pool.query(query, queryParams);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}