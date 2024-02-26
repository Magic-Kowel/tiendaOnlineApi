import { pool } from "../../db.js"
import { uid } from "uid";
import logger from "../../libs/logger.js"
import { SUCCESS_MESSAGE_INSERT } from "../../messagesSystem.js";
import { STATUS_USER_ACTIVE } from "../../config.js";
export const createProduct = async (req,res) =>{
    let connection;
    try {
        // Obtener una conexión del pool
        connection = await pool.getConnection();
    
        // Comenzar una transacción
        await connection.beginTransaction();
   
        const uidProducto = uid(32);
        const {
            description,
            idCategory,
            idGender,
            idMaterial,
            idSubCategory,
            nameProduct,
            sizesList
        } = req.body;
        const [rowsProduct] = await pool.query(`INSERT INTO catproductos
        (
            ecodProductos,
            tNombre,
            ecodCategoria,
            ecodEstatus,
            ecodMaterial,
            ecodGenero,
            Descripcion
        ) VALUES (?,?,?,?,?,?,?)`, [
            uidProducto,
            nameProduct,
            idCategory,
            STATUS_USER_ACTIVE,
            idMaterial,
            idGender,
            description
        ]);
        await Promise.all(sizesList.map(async (item) => {
            const uidVariacionproducto = uid(32);
            return pool.query(`INSERT INTO relvariacionproducto
            (
                ecodVariacionproducto,
                ecodTallavariacion,
                ecodProductos,
                nPrecio,
                nStock
            ) VALUES (?,?,?,?,?)`, [
                uidVariacionproducto,
                item.idSizeVariation,
                uidProducto,
                item.price,
                item.stock
            ]);
        }));
        // Confirmar la transacción
        await connection.commit();
  
        return res.status(200).json({
            created:true,
            message:SUCCESS_MESSAGE_INSERT
        });
    } catch (error) {
      // Revertir la transacción en caso de error
        if (connection) {
            await connection.rollback();
        }
        logger.error(error);
        return res.status(500).json({
            message: error
        });
      console.error('Error en la transacción:', error);
    } finally {
      // Liberar la conexión de vuelta al pool
      if (connection) {
        connection.release();
      }
    }
}