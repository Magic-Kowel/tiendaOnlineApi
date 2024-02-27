import { pool } from "../../db.js"
import { uid } from "uid";
import logger from "../../libs/logger.js"
import { SUCCESS_MESSAGE_INSERT } from "../../messagesSystem.js";
import { STATUS_USER_ACTIVE } from "../../config.js";
import { v2 as cloudinary } from 'cloudinary';
export const createProduct = async (req,res) =>{
    cloudinary.config({ 
        cloud_name: 'ddyldtxfs',
        api_key: '558652121984667',
        api_secret: 'xKZmAP9gkYujOx8g6JuTsSQEas8',
        secure: true,
        folder: 'magicImages'
    });
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No se han proporcionado archivos" });
    }
    let connection;
    try {
        const imagensUpload = [];
        for (const file of req.files) {
            try {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'magicImages' });
                imagensUpload.push(result);
            } catch (error) {
                console.error("Error al procesar un archivo:", error);
                // Puedes manejar errores específicos o simplemente agregar un objeto de error al array de resultados
                imagensUpload.push({ message: "Error al procesar el archivo" });
            }
        }

        console.log("1");
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
            ecodsubcategoria,
            ecodEstatus,
            ecodMaterial,
            ecodGenero,
            Descripcion
        ) VALUES (?,?,?,?,?,?,?)`, [
            uidProducto,
            nameProduct,
            idSubCategory,
            STATUS_USER_ACTIVE,
            idMaterial,
            idGender,
            description
        ]);
        console.log("2");
        console.log(sizesList);
        const parseSizesList = JSON.parse(sizesList);

        await Promise.all(parseSizesList.map(async (item) => {
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
        console.log("3");
        await Promise.all(imagensUpload.map(async (item) => {
            const uidImagen = uid(32);
            return pool.query(`INSERT INTO relproductoimagen
            (
                ecodRelProductoImagen,
                iImagen,
                ecodProductos
            ) VALUES (?,?,?)`, [
                uidImagen,
                item.url,
                uidProducto
            ]);
        }));
        console.log("4");
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
        await Promise.all(imagensUpload.map(async (item) => {
            await cloudinary.uploader.destroy(item.public_id);
        }));
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    } finally {
      // Liberar la conexión de vuelta al pool
      if (connection) {
        connection.release();
      }
    }
}