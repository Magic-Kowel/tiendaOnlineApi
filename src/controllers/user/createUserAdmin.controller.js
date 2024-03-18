import { pool } from "../../db.js";
import bcrypt from "bcryptjs";
import { uid } from 'uid';
import { sendEmail } from "../../libs/sendEmail.js";
import { STATUS_USER_PROCESS,TYPE_USER_ADDMIN } from "../../config.js";
import logger from "../../libs/logger.js";
import { BASE_URL_FRONT } from "../../config.js";
import { SUCCESS_MESSAGE_INSERT } from "../../messagesSystem.js";
import { generateRandomPassword } from "../../libs/generateRandomPassword.js";
export const createUserAdmin = async (req,res)=>{
  try {
      const {
        nameUser,
        lastName,
        email,
        birthDate
      } = req.body;
      const [row] = await pool.query('SELECT count(*) as tCorreo FROM catusuarios WHERE tCorreo = ? ',[email]);
      if(row[0].tCorreo >=1){
          return res.status(200).json({
              created:false,
              message: 'mail already exists'
          })
      }
      const salt = await bcrypt.genSalt(5);
      const randomPassword = generateRandomPassword(5);
      const passwordEncript = await bcrypt.hash(randomPassword, salt);
      const uidUser = uid(32);
      const [rows] = await pool.query(
          `INSERT INTO catusuarios(
            ecodUsuario,
            tNombre,
            tApellido,
            tCorreo,
            tPassword,
            ecotTipoUsaurio,
            ecodEstatus,
            fhNacimiento) VALUES (
              ?,?,?,?,?,?,?,?
            ) `,[
          uidUser,
          nameUser,
          lastName,
          email,
          passwordEncript,
          TYPE_USER_ADDMIN,
          STATUS_USER_PROCESS,
          birthDate
      ]);
      const emailObject={
        email:email,
        subject:'Verificación de correo electrónico',
        message:`Haga clic en el enlace siguiente para verificar su dirección de correo: ${BASE_URL_FRONT}/user/validate/${uidUser} \n 
            tu clave es ${randomPassword}
        `,
        data:{
          url:`${BASE_URL_FRONT}/user/validate/${uidUser}`,
          name:`${nameUser} ${lastName}`,
          pass:randomPassword
        }
      }
      sendEmail(emailObject);
      res.status(200).json({
        created:true,
        message:SUCCESS_MESSAGE_INSERT
      });
  } catch (error) {
      logger.error(error);
      return res.status(500).json({
          message: error
      });
  }
};