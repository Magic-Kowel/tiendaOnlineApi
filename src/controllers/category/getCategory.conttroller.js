import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
export const getCategory = async (req,res) =>{
    try {
        const id = req.params.idCategory;
        const [rows] = await pool.query(`SELECT
        ecodCategoria as id,
        tNombre as name
        FROM catcategoria 
        WHERE activo = 1 
        and ecodCategoria = ?`,[id]);
        if(rows.length <= 0){
            return res.status(404).json({
                message: 'caegory not found'
            });
        }
        res.json(rows);
    } catch (error) {
        logger.error(error);
        console.error(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
}