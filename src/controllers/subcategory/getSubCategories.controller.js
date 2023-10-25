import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getSubCategories = async (req,res) =>{
    try {
        const id = req.params.idCategory;
        const [rows] = await pool.query(`SELECT * FROM catsubcategoria
        where ecodCategoria = ? 
        and activo = 1`,[id]);
        return res.json(rows);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
}