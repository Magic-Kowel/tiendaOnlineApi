import { STATUS_USER_ACTIVE } from "../../config.js";
import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getProduct = async (req,res) =>{
    try {
        const id = req.params.idProduct;
        const [rows] = await pool.query(`SELECT
        catproductos.ecodProductos as idProduct,
        catproductos.tNombre as nameProduct,
        catproductos.ecodGenero as idGender,
        catsubcategoria.ecodsubcategoria as idSubcategory,
        catcategoria.ecodCategoria as idCategory,
        catmateriales.ecodMaterial as idMaterial,
        catproductos.Descripcion as description
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
    WHERE catproductos.ecodEstatus = ?
    AND catproductos.ecodProductos = ?
 `,[STATUS_USER_ACTIVE, id]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}