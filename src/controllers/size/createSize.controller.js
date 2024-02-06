import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
import { uid } from "uid";
import { STATUS_USER_ACTIVE } from "../../config.js";
export const createSize = async (req,res) =>{
    try {
        const uidSize = uid(32);
        const {nameSize} = req.body;
        const [row] = await pool.query(`INSERT INTO talla(
            ecodTalla,
            tTalla,
            ecodEstatus
        ) VALUES(?,?,?)
        `,[
            uidSize,
            nameSize,
            STATUS_USER_ACTIVE
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