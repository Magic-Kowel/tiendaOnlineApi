import { STATUS_USER_ACTIVE } from "../../config.js";
import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getProductDescription = async (req,res) =>{
    try {
        const id = req.params.idProduct;
        const [rows] = await pool.query(`SELECT
        catproductos.ecodProductos as idProduct,
        catproductos.tNombre as nameProduct,
        catsubcategoria.tNombre as subcategory,
        catcategoria.tNombre as category,
        catmateriales.tNombre as material,
        catproductos.Descripcion as description,
        catgeneros.tNombre as gender,
        grupoetario.tNombre as public,
        relvariacionproducto.nPrecio as price,
        relvariacionproducto.nStock as stock,
        relvariacionproducto.bPrincipal as main,
        relvariacionproducto.ecodEstatus as statusVariation,

        tallavariacion.nEdadMinima as minAge,
        tallavariacion.nEdadMaxima as maxAge,
        tallavariacion.nTalla size,
        tallavariacion.ecodEstatus as statusSize,
        talla.tTalla as namesize
    FROM
        catproductos
    INNER JOIN
        catmateriales ON catproductos.ecodMaterial = catmateriales.ecodMaterial
    INNER JOIN
        relproductoimagen ON catproductos.ecodProductos = relproductoimagen.ecodProductos
    RIGHT JOIN 
        catsubcategoria ON catproductos.ecodsubcategoria = catsubcategoria.ecodsubcategoria
    RIGHT JOIN 
        catcategoria ON catsubcategoria.ecodCategoria = catcategoria.ecodCategoria
    INNER JOIN relvariacionproducto ON relvariacionproducto.ecodProductos = catproductos.ecodProductos
    INNER JOIN tallavariacion ON tallavariacion.ecodTallavariacion = relvariacionproducto.ecodTallavariacion
    INNER JOIN talla ON talla.ecodTalla = tallavariacion.ecodTalla
    INNER JOIN catgeneros ON catgeneros.ecodGenero = catproductos.ecodGenero
    INNER JOIN grupoetario on grupoetario.ecodGrupoetario = tallavariacion.ecodGrupoetario
    WHERE catproductos.ecodEstatus = ?
    AND catproductos.ecodProductos = ?
    AND relvariacionproducto.ecodEstatus =?
    GROUP BY relvariacionproducto.ecodVariacionproducto;
 `,[STATUS_USER_ACTIVE,id,STATUS_USER_ACTIVE]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}