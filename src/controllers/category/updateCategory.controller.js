import logger from "../../libs/logger.js"
import { pool } from "../../db.js";
export const updateCategory = async (req,res) =>{
    try {
        const {id, name} = req.body;
        const [result] = await pool.query('UPDATE catcategoria SET tNombre = IFNULL(?,tNombre)  WHERE ecodCategoria = ?',
        [
            name,
            id
        ]);
        if(result.affectedRows > 0){
            return res.status(200).json({
                updated:true,
                message:'updated witd success'
            });
        }
    } catch (error) {
        console.error(error);
        logger.error(error);
        return res.status(500).json({
            message: error
        })
    }
}