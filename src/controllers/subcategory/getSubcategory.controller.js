import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
import { 
    ERROR_MESSAGE_GENERIC,
    ERROR_MESSAGE_SUB_CATEGORY_NOT_FOUND
} from "../../messagesSystem.js";
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
                message: ERROR_MESSAGE_SUB_CATEGORY_NOT_FOUND
            });
        }
        res.json(rows);
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        })
    }
}