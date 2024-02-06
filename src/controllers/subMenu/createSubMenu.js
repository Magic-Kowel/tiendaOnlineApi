import { pool } from "../../db.js";
import { uid } from "uid";
import logger from "../../libs/logger.js";

export const createSubMenu = async (req,res) => {
    try {
        const idSubmenu = uid(32);
        const {name,url,idUser,status,idMenu} = req.body;
        const [row] = await pool.query(`insert into catsubmenu 
        (
            ecodSubmenu,
            tNombre,
            tUrl,
            ecodCreacion,
            ecodEstatus,
            ecodMenu
        )
        VALUES(?,?,?,?,?,?)`,[ 
            idSubmenu,
            name,
            url,
            idUser,
            status,
            idMenu
        ])
        return res.status(200).json({
            created:true,
            message:"Created with success"
        });
    } catch (error) {
        console.log(error);
        logger.error(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
}