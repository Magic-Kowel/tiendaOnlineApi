import { pool } from "../../db.js";
import { uid } from "uid";
import logger from "../../libs/logger.js";
import { 
    SUCCESS_MESSAGE_INSERT,
    ERROR_MESSAGE_GENERIC
} from "../../messagesSystem.js";
export const createAccessControlMenu = async (req,res) =>{
    try {
        const {idTypeUser,idPermission} = req.body;
        console.log(req.body);
       
        const id= uid(32);
        pool.query(`insert into reltipousuariomenu 
        (
            ecodRelTipoUsuarioMenu,
            ecodTipoUsuarioPermiso,
            ecodTipoUsuario
        )
        VALUES(?,?,?)`,[
            id,
            idPermission,
            idTypeUser
        ]);
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