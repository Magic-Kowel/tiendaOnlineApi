import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { SUCCESS_MESSAGE_UPDATE } from "../../messagesSystem.js";
export const updateSubMenu = async(req,res)=>{
    try {
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toISOString().slice(0, 19).replace('T', ' ');
        console.log(fechaFormateada);
        const {
            idSubMenu,
            name,
            status,
            url,
            idMenu,
            icon
        } = req.body;
        const [result] = await pool.query(`UPDATE catsubmenu 
        SET 
        tNombre = IFNULL(?,tNombre),
        tUrl = IFNULL(?,tUrl),
        ecodEstatus = IFNULL(?,ecodEstatus),
        ecodMenu = IFNULL(?,ecodMenu),
        icon = IFNULL(?,icon),
        fhEdicion = ?
        WHERE ecodSubmenu = ?`,
        [
            name,
            url,
            status,
            idMenu,
            icon,
            fechaFormateada,
            idSubMenu
        ]);
        if(result.affectedRows > 0){
            return res.status(200).json({
                updated:true,
                message:SUCCESS_MESSAGE_UPDATE
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