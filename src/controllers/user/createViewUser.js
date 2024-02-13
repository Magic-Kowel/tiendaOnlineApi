import { pool } from "../../db.js";
import { uid } from "uid";
import logger from "../../libs/logger.js";
import { 
    SUCCESS_MESSAGE_INSERT,
    ERROR_MESSAGE_GENERIC
} from "../../messagesSystem.js";
export const createViewUser = async (req,res) => {
    try {
        const idMenuUser = uid(32);
        const {
            idMenu,
            idSubmenu,
            idUser
        } = req.body;
        const [row] = await pool.query(`insert into relusuariomenusubmenucontroller 
        (
            ecodRelusRarioMenuSubmenuController,
            ecodMenu,
            ecodSubmenu,
            ecodUsuario
        )
        VALUES(?,?,?,?)`,[ 
            idMenuUser,
            idMenu,
            idSubmenu,
            idUser
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