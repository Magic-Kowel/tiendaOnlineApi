import { STATUS_USER_ACTIVE } from "../../config.js";
import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getProductFilter = async (req,res) =>{
    const pageNumber= req.params.page || 1;
    const nameProduct = req.query.nameProduct|| "";
    const materialList = req.query.materialList|| []
    const maxPrice = req.query.maxPrice || 0
    const minPrice = req.query.minPrice || 0
    console.log(materialList);

    let searchMaterial = "";
    let materialValues = [];
    if (materialList && materialList.length > 0) {
        searchMaterial = ` AND catmateriales.tNombre IN (?)`;
        materialValues = materialList;
    }
    const pageSize=30;
    // Calcula el offset para la paginación
    const offset = (pageNumber - 1) * pageSize;
    try {
        let query = `
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
            WHERE
                catproductos.ecodEstatus = ? 
                AND relvariacionproducto.bPrincipal = 1
                AND (catproductos.tNombre LIKE CONCAT('%', COALESCE(?, catproductos.tNombre), '%'))`;

        const materialCondition = materialList && materialList.length > 0 ?
            `AND catmateriales.tNombre IN (${materialList.map(() => '?').join(', ')})` : '';

        const priceCondition = minPrice > 0 && maxPrice > 0 ?
            `AND relvariacionproducto.nPrecio BETWEEN ${minPrice} AND ${maxPrice}` : '';

        query += materialCondition;
        query += priceCondition;

        query += ` GROUP BY
            catproductos.ecodProductos
        LIMIT ?, ?;`;

        const queryParams = [STATUS_USER_ACTIVE, nameProduct, ...materialList, offset, pageSize];

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