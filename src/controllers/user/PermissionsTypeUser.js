import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
    export const PermissionsTypeUser = async (req,res) =>{
        try {
            const [rows] = await pool.query(`SELECT 
            catpermisos.ecodPermiso as id,
            catpermisos.tNombre AS name
        FROM 
            catpermisos
        LEFT JOIN 
            reltipousuariopermisos 
            ON catpermisos.ecodPermiso = reltipousuariopermisos.ecodPermiso
        WHERE 
            reltipousuariopermisos.ecodPermiso IS NULL;`);
            console.log(rows.length);
            res.json(rows);
        } catch (error) {
            logger.error(error);
            return res.status(500).json({
                message: ERROR_MESSAGE_GENERIC
        })

    }
}