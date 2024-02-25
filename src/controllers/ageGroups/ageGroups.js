import { pool } from "../../db.js";
import logger from "../../libs/logger.js";
export const ageGroups = async (req,res) =>{
    try {
        const [rows] = await pool.query(`SELECT
        ecodGrupoetario as idAgeGroup,
        tNombre as name
        FROM grupoetario;`);
        return res.json(rows)
    } catch (error) {
        console.error('Error in ageGroups controller:', error);
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    }
}