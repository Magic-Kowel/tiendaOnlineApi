import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
import { SUCCESS_MESSAGE_UPDATE } from "../../messagesSystem.js";
export const updateSubcategory = async (req,res) => {
    try {
        const {id, name} = req.body;
        const [result] = await pool.query(`UPDATE catsubcategoria   
        SET tNombre = IFNULL(?,tNombre)
        WHERE ecodsubcategoria  = ?`,
        [
            name,
            id
        ]);
        if(result.affectedRows > 0){
            return res.status(200).json({
                updated:true,
                message:SUCCESS_MESSAGE_UPDATE
            });
        }
    } catch (error) {
        console.log(error);
        logger.error(error);
        return req.status(500).json({
            message: error
        })
    }
}