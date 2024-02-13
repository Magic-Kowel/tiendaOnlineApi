import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { SUCCESS_MESSAGE_UPDATE } from "../../messagesSystem.js";
export const updateSize = async(req,res)=>{
    try {
        const {nameSize,idSize} = req.body;
        const [result] = await pool.query(`UPDATE talla 
        SET tTalla = IFNULL(?,tTalla)
        WHERE ecodTalla = ?`,
        [
            nameSize,
            idSize
        ]);
        if(result.affectedRows > 0){
            return res.status(200).json({
                updated:true,
                message:SUCCESS_MESSAGE_UPDATE
            });
        }
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        })
    }
}