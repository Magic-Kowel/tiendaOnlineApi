import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const updateMenu = async(req,res)=>{
    try {
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toISOString().slice(0, 19).replace('T', ' ');
        console.log(fechaFormateada);
        const {idStatus,idMenu, name} = req.body;
        const [result] = await pool.query(`UPDATE catmenu 
        SET tNombre = IFNULL(?,tNombre),
        ecodEstatus = IFNULL(?,ecodEstatus),
        fhEdicion = ?
        WHERE ecodMenu = ?`,
        [
            name,
            idStatus,
            fechaFormateada,
            idMenu
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