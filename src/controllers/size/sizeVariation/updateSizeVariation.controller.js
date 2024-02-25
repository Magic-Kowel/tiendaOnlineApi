import { pool } from "../../../db.js";
import logger from "../../../libs/logger.js";
import { SUCCESS_MESSAGE_UPDATE } from "../../../messagesSystem.js";
import { toolValidateVariation } from "./toolValidateVariation.js";
export const updateSizeVariation = async(req,res)=>{
    try {
        const {
            idSizeVariation,
            idSize,
            idAgeGroup,
            minAge,
            maxAge,
        } = req.body;
        const response = await toolValidateVariation({
            idSize:idSize,
            idAgeGroup:idAgeGroup,
        });
        console.log(response);
        if(response > 0){
            return res.status(422).json({
                created:true,
                message:DUPLICATE_COMBINATION
            });
        }
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