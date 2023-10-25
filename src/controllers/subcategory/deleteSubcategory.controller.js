import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
export const deleteSubcategory = async (req,res) =>{
    try {
        const id = req.params.idSubcategory;
        const [result] = await pool.query(`UPDATE catsubcategoria SET activo = 0
        WHERE ecodsubcategoria = ?`,[id]);
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
        console.log(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        })
    }
}