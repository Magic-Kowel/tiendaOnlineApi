import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { STATUS_USER_ACTIVE } from "../../config.js";
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const getUsers = async(req,res) =>{
  try {
      const [rows] = await pool.query(`
      SELECT 
      catusuarios.ecodUsuario as id,
      catusuarios.tNombre as name,
      catusuarios.tApellido as lastName,
      cattipousuario.tNombre as TypeUser,
      catestatus.tNombre as status
      FROM catusuarios
      inner join cattipousuario
      on cattipousuario.ecodTipoUsuario = cattipousuario.ecodTipoUsuario
      INNER JOIN catestatus
      on catusuarios.ecodEstatus = catestatus.ecodEstatus
      WHERE catusuarios.ecodEstatus = ?
      `,[STATUS_USER_ACTIVE]);
      res.json(rows);
  } catch (error) {
    logger.error(error);
      return res.status(500).json({
          message: ERROR_MESSAGE_GENERIC
      });
  }
}