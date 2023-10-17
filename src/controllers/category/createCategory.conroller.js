import { pool } from "../../db.js"
import { uid } from "uid";
import logger from "../../libs/logger.js"
export const createCategory = async (req,res) =>{
    try {
        const uidUser = uid(32);
        const {name} = req.body;
        const [row] = await pool.query(`insert into catcategoria(ecodCategoria, tNombre) 
        values(?,?)`,[uidUser,name]);
        return res.status(200).json({
            created:true,
            message:"Created with success"
        })
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: error
        })
    }
}