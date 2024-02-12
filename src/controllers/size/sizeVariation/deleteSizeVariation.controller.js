import { pool } from "../../../db.js";
import logger from "../../../libs/logger.js";
import { STATUS_USER_DELETE } from "../../../config.js";
export const deleteSizeVariation = async (req,res) =>{
    try {
        const id = req.params.idSizeVariation;
        const [result] = await pool.query(`UPDATE tallavariacion 
        SET ecodEstatus = ?
        WHERE ecodTallavariacion = ?`,[STATUS_USER_DELETE,id]);
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