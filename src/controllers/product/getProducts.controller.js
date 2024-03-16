import { STATUS_USER_ACTIVE } from "../../config.js";
import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getProducts = async (req,res) =>{
    try {
        const [rows] = await pool.query(`SELECT
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
    WHERE
        catproductos.ecodEstatus = ? 
        AND relvariacionproducto.bPrincipal = 1
    GROUP BY
        catproductos.ecodProductos;
    `,[STATUS_USER_ACTIVE]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}