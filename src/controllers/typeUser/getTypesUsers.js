import { STATUS_USER_ACTIVE } from "../../config.js";
import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const getTypesUsers = async (req,res) =>{
    try {
        const [rows] = await pool.query(`SELECT 
        tNombre as typeUser,
        ecodTipoUsuario as idTypeUser
        FROM cattipousuario;`);
        return res.json(rows)
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}