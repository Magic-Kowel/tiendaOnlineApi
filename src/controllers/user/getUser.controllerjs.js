import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const getUser= async(req,res) =>{
  try {
      const [rows] = await pool.query(`SELECT 
      catusuarios.ecodUsuario AS idUser,
      ecodTipoUsuario as idTypeUser,
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
    `,[req.params.idUser]);
      res.json(rows);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
        message: ERROR_MESSAGE_GENERIC
    })
  }
}