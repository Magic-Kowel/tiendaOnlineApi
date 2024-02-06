import { pool } from "../../db.js";
import { uid } from "uid";
import logger from "../../libs/logger.js";

export const createViewUser = async (req,res) => {
    try {
        const idMenuUser = uid(32);
        const {
            idMenu,
            idSubmenu,
            idUser
        } = req.body;
        const [row] = await pool.query(`insert into relusuariomenusubmenucontroller 
        (
            ecodRelusRarioMenuSubmenuController,
            ecodMenu,
            ecodSubmenu,
            ecodUsuario
        )
        VALUES(?,?,?,?)`,[ 
            idMenuUser,
            idMenu,
            idSubmenu,
            idUser
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