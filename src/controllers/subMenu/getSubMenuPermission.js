import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
import { STATUS_USER_ACTIVE } from "../../config.js";
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
    export const getSubMenuPermission = async (req,res) =>{
        const idTypeUser = req.params.idTypeUser;
        try {
            const typeUser = req.params.typeUser;
            const [rows] = await pool.query(`SELECT 
                catsubmenu.ecodSubmenu as id,
                catsubmenu.tNombre AS name
            FROM 
                catsubmenu
            LEFT JOIN 
                reltipousuariopermisos 
                ON catsubmenu.ecodSubmenu = reltipousuariopermisos.ecodSubmenu
                AND reltipousuariopermisos.ecodTipoUsuario = ?
            WHERE 
                reltipousuariopermisos.ecodSubmenu IS NULL;`,[idTypeUser]);
            res.json(rows);
        } catch (error) {
            logger.error(error);
            return res.status(500).json({
                message: ERROR_MESSAGE_GENERIC
        })

    }
}