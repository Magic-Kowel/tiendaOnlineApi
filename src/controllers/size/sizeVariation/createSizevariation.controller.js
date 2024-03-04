import { pool } from "../../../db.js";
import logger from "../../../libs/logger.js";
import { uid } from "uid";
import { STATUS_USER_ACTIVE } from "../../../config.js";
import { SUCCESS_MESSAGE_INSERT, DUPLICATE_COMBINATION } from "../../../messagesSystem.js";
import { toolValidateVariation } from "./toolValidateVariation.js";
export const createSizeVariation = async (req,res) =>{
    try {
        const uidSize = uid(32);
        const {idSize,idAgeGroup,minAge,maxAge,size} = req.body;
        const response = await toolValidateVariation({
            idSize:idSize,
            idAgeGroup:idAgeGroup,
            STATUS_USER_ACTIVE:STATUS_USER_ACTIVE
        });
        if(response > 0){
            return res.status(422).json({
                created:true,
                message:DUPLICATE_COMBINATION
            });
        }
        const [row] = await pool.query(`INSERT INTO tallavariacion(
            ecodTallavariacion,
            ecodTalla,
            ecodGrupoetario,
            nEdadMinima,
            nEdadMaxima,
            nTalla,
            ecodEstatus
        ) VALUES(?,?,?,?,?,?,?)
        `,[
            uidSize,
            idSize,
            idAgeGroup,
            minAge || null,
            maxAge || null,
            size ||null,
            STATUS_USER_ACTIVE
        ]);
        return res.status(200).json({
            created:true,
            message:SUCCESS_MESSAGE_INSERT
        });
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        })
    }
}