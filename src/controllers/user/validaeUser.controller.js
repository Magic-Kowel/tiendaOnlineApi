import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { STATUS_USER_ACTIVE } from "../../config.js";
export const validaeUser = async (req,res)=>{
    try {
        const {uid} = req.body;
        const [rows] = await pool.query(`UPDATE catusuarios
        SET  ecodEstatus = ? 
        WHERE ecodUsuario = ?;`,[STATUS_USER_ACTIVE,uid]);
        res.status(200).json({
            active:true,
            message:"Actived with success"
        });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }

}