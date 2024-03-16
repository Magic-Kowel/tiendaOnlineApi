import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { v2 as cloudinary } from 'cloudinary'; 
import { conectCloudinary } from "../../libs/conectCloudinary.js";
import { SUCCESS_MESSAGE_DELETE,ERROR_MESSAGE_GENERIC } from "../../messagesSystem.js";
export const deleteImagenProduct = async (req,res)=>{
    try {
        const id = req.params.idImagen;
        conectCloudinary(cloudinary);
        const [row] = await pool.query(`SELECT * FROM relproductoimagen
        WHERE ecodRelProductoImagen = ?`,[id]);
        if(row[0].tipoAlmacenamiento ==="servicio"){
            await cloudinary.uploader.destroy(row[0].publicId);
        }
        const [result] = await pool.query(`DELETE FROM relproductoimagen WHERE ecodRelProductoImagen = ?`,[id]);

        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: ERROR_MESSAGE_GENERIC
            });
        }
        return res.status(200).json({
            delete:true,
            message:SUCCESS_MESSAGE_DELETE
        });
        return res.status(200).json(row);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: error
        })
    }
}