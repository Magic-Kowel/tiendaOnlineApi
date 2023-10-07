import { pool } from "../../db.js";
export const getUsers = async(req,res) =>{
  try {
      const [rows] = await pool.query("SELECT * FROM catusuarios");
      res.json(rows);
  } catch (error) {
      return res.status(500).json({
          message: 'Something goes wrong'
      })
  }
}