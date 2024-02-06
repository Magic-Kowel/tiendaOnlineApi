import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
import { uid } from "uid";
export const createSubCategory = async (req,res) =>{
    try {
        const uidUser = uid(32);
        const {name,idCategory} = req.body;
        const [row] = await pool.query(`insert into catsubcategoria (ecodsubcategoria,tNombre,ecodCategoria)
            values(?,?,?)
        `,[
            uidUser,
            name,
            idCategory
        ]);
        return res.status(200).json({
            created:true,
            message:"Created with success"
        });
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        })
    }
}