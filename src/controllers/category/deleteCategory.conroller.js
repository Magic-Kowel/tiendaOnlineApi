import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { SUCCESS_MESSAGE_DELETE,ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const deleteCategory = async (req,res)=>{
    try {
        const id = req.params.idCategory;
        const [result] = await pool.query(`UPDATE catcategoria SET activo = 0
        WHERE ecodCategoria = ?`,[id]);
        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: ERROR_MESSAGE_GENERIC
            });
        }
        return res.status(200).json({
            delete:true,
            message:SUCCESS_MESSAGE_DELETE
        });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: error
        })
    }
}