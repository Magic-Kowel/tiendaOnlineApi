import { pool } from "../../db.js"
import logger from "../../libs/logger.js"
export const getMenu = async (req,res) =>{
    const {idUser} = req.body;
    try {
        const [rows] = await pool.query(`
        SELECT 
            catmenu.ecodMenu as idMenu,
            catsubmenu.ecodSubmenu as idItemMenu,
            catsubmenu.tNombre as itemMenu,
            catsubmenu.tUrl as url,
            catestatus.tNombre as status,
            catmenu.tNombre as Menu
        FROM catsubmenu
        INNER JOIN catestatus
        on catsubmenu.ecodEstatus = catestatus.ecodEstatus
        JOIN catmenu
        on catmenu.ecodMenu =catsubmenu.ecodMenu;
        `,[idUser]);
        res.json(rows);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}
// SELECT rumspc.ecodRelusRarioMenuSubmenuController, cm.tNombre AS Menu,
// cm.Iconos,
// cs.tNombre AS submenuNombre,
// cs.tUrl as urlSubMenu
// FROM relusuariomenusubmenucontroller rumspc 
// LEFT JOIN catmenu cm ON cm.ecodMenu= rumspc.ecodMenu 
// LEFT JOIN catsubmenu cs ON cs.ecodSubmenu = rumspc.ecodSubmenu
//     WHERE rumspc.ecodUsuario = ?;