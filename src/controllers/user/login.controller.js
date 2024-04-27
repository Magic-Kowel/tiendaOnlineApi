import { pool } from "../../db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { SECRET_KEY,STATUS_USER_ACTIVE,STATUS_USER_DELETE } from "../../config.js";
import logger from "../../libs/logger.js";
import { ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const login = async(req,res)=>{
    const {password,email} = req.body;
    try {
        const [status] = await pool.query(`SELECT 
        COUNT(*) AS active
        FROM catusuarios
        where catusuarios.tCorreo = ? AND catusuarios.ecodEstatus = ?`,[email,STATUS_USER_DELETE])
        if(status[0].active){
            return res.json({
                message: 'User not is active',
                active:false 
            })
        }
        const [row] = await pool.query(`SELECT 
        catusuarios.ecodUsuario as idUser,
        cattipousuario.ecodTipoUsuario as idTypeUser,
        cattipousuario.tNombre AS type,
        catusuarios.tNombre as name,
        catusuarios.tCorreo as email,
        catusuarios.tPassword as PASSWORD,
        catestatus.tNombre as status,
        catestatus.ecodEstatus as idStatus
        FROM catusuarios 
        INNER join cattipousuario 
        on cattipousuario.ecodTipoUsuario = catusuarios.ecotTipoUsaurio
        inner JOIN catestatus 
        on catestatus.ecodEstatus = catusuarios.ecodEstatus
        where catusuarios.tCorreo = ?`,[email]);
        if(row.length){
            const isPasswordValid = await bcrypt.compare(password, row[0].PASSWORD);
            if(email == row[0].email && isPasswordValid && row[0].idStatus ===STATUS_USER_ACTIVE){
                const token = jwt.sign({
                    id: row[0].idUser,
                    typeUser: row[0].type
                },
                SECRET_KEY,
                {
                    expiresIn: '7d'
                })
                return res.json({
                    idUser: row[0].idUser,
                    message: 'Logged in successfully',
                    auth: true,
                    userName: row[0].name,
                    token:token
                });
            }
        }
        return res.json({
            message: 'Incorrect email or password',
            logged:false 
        })
    } catch (error) {
        logger.error(error);
        console.log(error);
        return res.status(500).json({
            messahe:ERROR_MESSAGE_GENERIC
        })
    }
}