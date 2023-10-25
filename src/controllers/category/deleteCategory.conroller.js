import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const deleteCategory = async (req,res)=>{
    try {
        const id = req.params.idCategory;
        const [result] = await pool.query(`UPDATE catcategoria SET activo = 0
        WHERE ecodCategoria = ?`,[id]);
        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: 'error when deleting'
            });
        }
        return res.status(200).json({
            delete:true,
            message:"Delete with success"
        });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: error
        })
    }
}