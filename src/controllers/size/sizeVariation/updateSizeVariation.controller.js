import { pool } from "../../../db.js";
import logger from "../../../libs/logger.js";
import { SUCCESS_MESSAGE_UPDATE } from "../../../messagesSystem.js";
export const updateSizeVariation = async(req,res)=>{
    console.log("entro");
    try {
        const {
            idSizeVariation,
            idSize,
            idAgeGroup,
            minAge,
            maxAge
        } = req.body;
        
        const [result] = await pool.query(`UPDATE tallavariacion 
        SET 
        ecodTalla  = IFNULL(?,ecodTalla ),
        ecodGrupoetario  = IFNULL(?,ecodGrupoetario ),
        nEdadMinima = IFNULL(?,nEdadMinima),
        nEdadMaxima = IFNULL(?,nEdadMaxima)
        WHERE ecodTallavariacion = ?`,
        [
            idSize,
            idAgeGroup,
            minAge,
            maxAge,
            idSizeVariation
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