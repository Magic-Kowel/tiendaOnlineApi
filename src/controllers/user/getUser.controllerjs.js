import { pool } from "../../db.js";
export const getUser= async(req,res) =>{
  try {
      const [rows] = await pool.query("SELECT * FROM catusuarios WHERE ecodUsuario = ?",[req.params.uid]);
      res.json(rows);
  } catch (error) {
      return res.status(500).json({
          message: 'Something goes wrong'
      })
  }
}