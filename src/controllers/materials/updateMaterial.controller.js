import logger from "../../libs/logger.js"
import { pool } from "../../db.js";
import { SUCCESS_MESSAGE_UPDATE } from "../../messagesSystem.js";
export const updateMaterial = async (req,res) =>{
    try {
        const {idMaterial, nameMaterial} = req.body;
        const [result] = await pool.query(`UPDATE 
        catmateriales 
        SET tNombre = IFNULL(?,tNombre)  
        WHERE ecodMaterial = ?`,
        [
            nameMaterial,
            idMaterial
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