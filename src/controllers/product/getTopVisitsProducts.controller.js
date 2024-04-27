import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getTopVisitsProducts = async (req,res) =>{
    try {
        let query = `SELECT 
                COUNT(*) as visit,
                catproductos.tNombre as products
            FROM catproductovistas
            INNER JOIN catproductos
                ON catproductovistas.ecodProductos = catproductos.ecodProductos
            GROUP BY catproductos.tNombre
            ORDER BY visit DESC
            limit 5;
        `;
        const [rows] = await pool.query(query);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}