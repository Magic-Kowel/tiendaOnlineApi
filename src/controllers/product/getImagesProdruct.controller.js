import { STATUS_USER_ACTIVE } from "../../config.js";
import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getImagesProdruct = async (req,res) =>{
    try {
        const id = req.params.idProduct;
        const [rows] = await pool.query(`SELECT 
        ecodRelProductoImagen as idImagen,
        ecodProductos as idProduct,
        iImagen as imagen
    FROM relproductoimagen
    WHERE ecodProductos = ?
 `,[id]);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}