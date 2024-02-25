import { STATUS_USER_ACTIVE } from "../../../config.js";
import { pool } from "../../../db.js";
import logger from "../../../libs/logger.js";
import { toolValidateVariation } from "./toolValidateVariation.js";
export const validateVariation = async (req,res) =>{
    try {
        const {idSize,idAgeGroup,isEdit} = req.body;
        const response = await toolValidateVariation({
            idSize:idSize,
            idAgeGroup:idAgeGroup,
            STATUS_USER_ACTIVE:STATUS_USER_ACTIVE,
            isEdit:isEdit
        });
        return res.json(response)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}