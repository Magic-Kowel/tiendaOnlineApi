import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getVisitProducts = async (req,res) =>{
    try {
        let query = `SELECT 
            COUNT(*) as visit,
            DATE_FORMAT(fhVista, '%Y-%m-%d') as date 
            FROM catproductovistas 
            GROUP BY fhVista;
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