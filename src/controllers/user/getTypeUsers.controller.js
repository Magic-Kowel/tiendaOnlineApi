import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const getTypeUsers= async(req,res) =>{
  try {
      const [rows] = await pool.query(`SELECT
      ecodTipoUsuario as idTypeUser,
      tNombre as nameTypeUser,
      tDescripcion as description
      FROM cattipousuario
    `);
      res.json(rows);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
        message: ERROR_MESSAGE_GENERIC
    })
  }
}