import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
export const getMenu = async (req,res) =>{
    const {idUser} = req.body;
    try {
        const [rows] = await pool.query(`
            SELECT rumspc.ecodRelusRarioMenuSubmenuController, cm.tNombre AS Menu,rumspc.tToken, cm.Iconos,cs.tNombre AS submenuNombre,cs.tUrl as urlSubMenu, cct.tNombre AS nombreController, cct.turl AS urlController 
            FROM relusuariomenusubmenucontroller rumspc 
            LEFT JOIN catmenu cm ON cm.ecodMenu= rumspc.ecodMenu 
            LEFT JOIN catsubmenu cs ON cs.ecodSubmenu = rumspc.ecodSubmenu
            LEFT JOIN catcotcontroller cct on cct.ecodControler = rumspc.ecodController
            WHERE rumspc.ecodUsuario = ?;
        `,[idUser]);
        res.json(rows);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}