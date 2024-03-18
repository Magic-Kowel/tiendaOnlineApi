import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const validateEmailExist = async(req,res)=>{
    try {
        const [row] = await pool.query(`SELECT count(*) as tCorreo 
        FROM catusuarios 
        WHERE tCorreo = ? 
        AND ecodUsuario != ? `,[
            req.params.email,
            req.params.idUser
        ]);
        if(row[0].tCorreo >=1){
            return res.status(200).json({
                exists:1,
                message: 'mail already exists'
            })
        }else{
            return res.status(200).json({
                exists:0,
                message: 'mail not exists'
            })
        }
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        })
    }
}