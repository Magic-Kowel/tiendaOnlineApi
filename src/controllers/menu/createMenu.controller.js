import { pool } from "../../db.js";
import { uid } from "uid";
import logger from "../../libs/logger.js";
import { 
    ERROR_MESSAGE_GENERIC,
    SUCCESS_MESSAGE_INSERT
} from "../../messagesSystem.js";
export const createMenu = async (req,res) => {
    try {
        const idMenu = uid(32);
        const {name,idUser,status} = req.body;
        const [row] = await pool.query(`insert into catmenu 
        (
            ecodMenu,
            tNombre,
            ecodCreacion,
            ecodEstatus 
        )
        VALUES(?,?,?,?)`,[
            idMenu,
            name,
            idUser,
            status
        ])
        return res.status(200).json({
            created:true,
            message:SUCCESS_MESSAGE_INSERT
        });
    } catch (error) {
        console.log(error);
        logger.error(error);
        return res.status(500).json({
            message: ERROR_MESSAGE_GENERIC
        });   
    }
}