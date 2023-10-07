import { pool } from "../../db.js";
export const validateEmail = async(req,res)=>{
  const [row] = await pool.query('SELECT count(*) as tCorreo FROM catusuarios WHERE tCorreo = ? ',[req.params.email]);
  if(row[0].tCorreo >=1){
      return res.status(200).json({
          exists:1,
          message: 'mail already exists'
      })
  }else{
      return res.status(200).json({
          exists:0,
          message: 'mail not exists'
      })
  }
}