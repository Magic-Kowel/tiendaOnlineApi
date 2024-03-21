import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
import { STATUS_USER_PROCESS } from "../../config.js";
export const getUserProcess= async(req,res) =>{
  try {
      const [rows] = await pool.query(`SELECT 
      catusuarios.ecodUsuario AS idUser,
      catusuarios.tNombre AS nameUser,
      catusuarios.tApellido AS lastName,
      catusuarios.tCorreo AS email,
      DATE_FORMAT(catusuarios.fhNacimiento, '%Y-%m-%d') AS birthdate,
      cattipousuario.tNombre AS typeUser,
      catestatus.tNombre AS status
      FROM catusuarios
      INNER JOIN cattipousuario
      on catusuarios.ecotTipoUsaurio = cattipousuario.ecodTipoUsuario
      INNER JOIN catestatus
      on catusuarios.ecodEstatus = catestatus.ecodEstatus
      WHERE catusuarios.ecodUsuario = ? 
      AND catusuarios.ecodEstatus = ?
    `,[req.params.idUser,STATUS_USER_PROCESS]);
      res.json(rows);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
        message: ERROR_MESSAGE_GENERIC
    })
  }
}