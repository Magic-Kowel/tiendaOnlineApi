import { pool } from "../../../db.js";
import logger from "../../../libs/logger.js";
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
        console.log("edito",result.affectedRows);
        if(result.affectedRows > 0){
            return res.status(200).json({
                updated:true,
                message:'updated witd success'
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