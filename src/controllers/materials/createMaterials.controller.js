import { pool } from "../../db.js"
import { uid } from "uid";
import logger from "../../libs/logger.js"
import { STATUS_USER_ACTIVE } from "../../config.js";
import { SUCCESS_MESSAGE_INSERT } from "../../messagesSystem.js";
export const createMaterial = async (req,res) =>{
    try {
        const uidUser = uid(32);
        const {nameMaterial} = req.body;
        const [row] = await pool.query(`insert into catmateriales(
            ecodMaterial,
            tNombre,
            ecodEstatus
        ) 
        values(?,?,?)`,[uidUser,nameMaterial,STATUS_USER_ACTIVE]);
        return res.status(200).json({
            created:true,
            message:SUCCESS_MESSAGE_INSERT
        });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}