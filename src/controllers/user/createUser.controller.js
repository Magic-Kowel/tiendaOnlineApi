import { pool } from "../../db.js";
import bcrypt from "bcryptjs";
import { uid } from 'uid';
import { sendEmail } from "../../libs/sendEmail.js";
export const createUser = async (req,res)=>{
  try {
      const {
        name,
        lastName,
        password,
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
      const salt = await bcrypt.genSalt(10);
      const passwordEncript = await bcrypt.hash(password, salt);
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
          name,
          lastName,
          email,
          passwordEncript,
          "cliente",
          "",
          birthDate
      ]);
      const emailObject={
        email:email,
        subject:'Verificación de correo electrónico',
        message:`Haga clic en el enlace siguiente para verificar su dirección de correo: http://localhost:5173/user/validate/${uidUser}`
      }
      sendEmail(emailObject);
      res.status(200).json({
        created:true,
        message:"Created with success"
      });
  } catch (error) {
      return res.status(500).json({
          message: error
      });
  }
};