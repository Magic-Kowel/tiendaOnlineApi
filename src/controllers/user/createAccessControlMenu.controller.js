import { pool } from "../../db.js";
import { uid } from "uid";
import logger from "../../libs/logger.js";
import { 
    SUCCESS_MESSAGE_INSERT,
    ERROR_MESSAGE_GENERIC
} from "../../messagesSystem.js";
export const createAccessControlMenu = async (req,res) =>{
    try {
        const {idTypeUser,listAccessControlMenu} = req.body;
        const [listDelete] = await pool.query("SELECT ecodTipoUsuarioPermiso FROM reltipousuariomenu");
        const itemsNotInArray = listDelete.filter(item1 => 
            !listAccessControlMenu.some(item2 => item1.ecodTipoUsuarioPermiso === item2.idMenuPermission)
        );
        await Promise.all(itemsNotInArray.map(async (item, index) => {
            return pool.query(`DELETE FROM reltipousuariomenu WHERE ecodTipoUsuarioPermiso = ?`,[
                item.ecodTipoUsuarioPermiso,
            ]);
        }));
        await Promise.all(listAccessControlMenu.map(async (item, index) => {
            const id= uid(32);

            const [existingRows] = await pool.query("SELECT 1 FROM reltipousuariomenu WHERE ecodTipoUsuarioPermiso = ?",
                [item.idMenuPermission]
            );
            if (existingRows.length > 0) {
                return;
            }
            return pool.query(`insert into reltipousuariomenu 
            (
                ecodRelTipoUsuarioMenu,
                ecodTipoUsuarioPermiso,
                ecodTipoUsuario
            )
            VALUES(?,?,?)`,[
                id,
                item.idMenuPermission,
                idTypeUser
                
            ]);
        }));
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