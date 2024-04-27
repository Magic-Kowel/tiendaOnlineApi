import { STATUS_USER_ACTIVE } from "../../config.js";
import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getProducts = async (req,res) =>{
    const pageNumber= req.params.page || 1;
    const nameProduct = req.query.nameProduct|| "";
    const materialList = req.query.materialList|| [];
    const genderList = req.query.genderList|| [];
    const sizeList = req.query.sizeList|| [];
    const maxPrice = req.query.maxPrice || 0;
    const minPrice = req.query.minPrice || 0;
    const maxAge = req.query.maxAge || 0;
    const minAge = req.query.minAge || 0;
    const size = req.query.size || 0;
    const isChildren = req.query.isChildren || false;
    const isAdult = req.query.isAdult || false;
    console.log(sizeList);
    let searchMaterial = "";
    let materialValues = [];
    if (materialList && materialList.length > 0) {
        searchMaterial = ` AND catmateriales.tNombre IN (?)`;
        materialValues = materialList;
    }
    const pageSize=12;
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
                ${ minPrice > 0 && maxPrice > 0 ? '' : 'AND relvariacionproducto.bPrincipal = 1' }
                
                AND (catproductos.tNombre LIKE CONCAT('%', COALESCE(TRIM(?), catproductos.tNombre), '%'))`;

        const materialCondition = materialList && materialList.length > 0 ?
            ` AND catmateriales.tNombre IN (${materialList.map(() => '?').join(', ')})` : '';

        const genderCondition = genderList && genderList.length > 0 ?
        ` AND catgeneros.tNombre IN (${genderList.map(() => '?').join(', ')})` : '';

        const sizeCondition = sizeList && sizeList.length > 0 ?
            ` AND talla.tTalla IN (${sizeList.map(() => '?').join(', ')})` : '';

        const priceCondition = minPrice >= 0 && maxPrice > 0 ?
            `AND relvariacionproducto.nPrecio BETWEEN ${minPrice} AND ${maxPrice}` : '';

        const ageRange = minAge > 0 && maxAge > 0 ?
        ` AND tallavariacion.nEdadMinima >= ${minAge}
            AND tallavariacion.nEdadMaxima <= ${maxAge}` : '';

        const sizeFilter = size > 0   ?
        ` AND tallavariacion.nTalla = ${size}` : '';

        let isChildrenCondition = '';
        if(isChildren == "true" && isAdult =="false"){
            isChildrenCondition = ` AND grupoetario.tNombre = 'Infantil' `;
        }
        let isAdultCondition = '';
        if(isAdult =="true" && isChildren == "false"){
            isAdultCondition = ` AND grupoetario.tNombre = 'Adulto' `;
        }
        query += materialCondition;
        query += genderCondition;
        query += sizeCondition;
        query += priceCondition;
        query += ageRange;
        query += sizeFilter;
        query += isChildrenCondition;
        query += isAdultCondition;
        
        query += ` GROUP BY
        catproductos.ecodProductos
        LIMIT ?, ?;`;
        const queryParams = [STATUS_USER_ACTIVE, nameProduct,...materialList,...genderList,...sizeList, offset, pageSize];
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