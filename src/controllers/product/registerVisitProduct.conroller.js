import { pool } from "../../db.js"
import { uid } from "uid";
import logger from "../../libs/logger.js"
import { SUCCESS_MESSAGE_INSERT } from "../../messagesSystem.js";
export const registerVisitProduct = async (req,res) =>{
    try {
        const idVisitProduct = uid(32);
        const {idProduct} = req.body;
        console.log(idProduct);
        const [row] = await pool.query(`INSERT INTO catproductovistas(
            ecodProductovista,
            ecodProductos
        )values(?,?)`,[idVisitProduct,idProduct]);
        return res.status(200).json({
            created:true,
            message:SUCCESS_MESSAGE_INSERT
        });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}