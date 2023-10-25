import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
export const getSubcategory = async (req,res) =>{
    try {
        const id = req.params.idSubcategory;
        const [rows] = await pool.query(`SELECT ecodsubcategoria as id,
        tNombre as name 
        FROM catsubcategoria 
        WHERE activo = 1 
        and ecodsubcategoria = ?`,[id]);
        if(rows.length <= 0){
            return res.status(404).json({
                message: 'caegory not found'
            });
        }
        res.json(rows);
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}