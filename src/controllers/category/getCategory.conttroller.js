import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
import { 
    ERROR_MESSAGE_GENERIC,
    ERROR_MESSAGE_CATEGORY_NOT_FOUND
} from "../../messagesSystem.js";
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
                message: ERROR_MESSAGE_CATEGORY_NOT_FOUND
            });
        }
        res.json(rows);
    } catch (error) {
        logger.error(error);
        console.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        });
    }
}