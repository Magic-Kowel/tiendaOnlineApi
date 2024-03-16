import logger from "../../libs/logger.js"
import { pool } from "../../db.js";
import { uid } from "uid";
import { STATUS_USER_DELETE } from "../../config.js";
import { SUCCESS_MESSAGE_UPDATE } from "../../messagesSystem.js";
import { conectCloudinary } from "../../libs/conectCloudinary.js";
import { clearFilesUpload } from "../../libs/clearFilesUpload.js";
import { v2 as cloudinary } from 'cloudinary';
export const updateProduct = async (req,res) =>{
    conectCloudinary(cloudinary);
    let connection;
    const imagensUpload = [];
    try {
        for (const file of req.files) {
            try {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'magicImages' });
                imagensUpload.push(result);
            } catch (error) {
                console.error("Error al procesar un archivo:", error);
                imagensUpload.push({ message: "Error al procesar el archivo" });
            }
        }
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const {
            description,
            idCategory,
            idProduct,
            idGender,
            idMaterial,
            idSubCategory,
            nameProduct,
            imageUrls,
            sizesList
        } = req.body;
        const parseImageUrls = JSON.parse(imageUrls);
        const [result] = await pool.query(`UPDATE 
        catproductos 
        SET tNombre = IFNULL(?,tNombre),
        Descripcion = IFNULL(?,Descripcion),
        ecodMaterial = IFNULL(?,ecodMaterial),
        ecodGenero = IFNULL(?,ecodGenero),
        ecodsubcategoria = IFNULL(?,ecodsubcategoria)
        WHERE ecodProductos = ?`,
        [
            nameProduct,
            description,
            idMaterial,
            idGender,
            idSubCategory,
            idProduct
        ]);
        await Promise.all(imagensUpload.map(async (item) => {
            const uidImagen = uid(32);
            console.log("idProduct",idProduct);
            return pool.query(`INSERT INTO relproductoimagen
            (
                ecodRelProductoImagen,
                iImagen,
                ecodProductos,
                tipoAlmacenamiento,
                publicId
            ) VALUES (?,?,?,?,?)`, [
                uidImagen,
                item.url,
                idProduct,
                "servicio",
                item.public_id
            ]);
        }));
        console.log("parseImageUrls",parseImageUrls);
        if(parseImageUrls.length){
            await Promise.all(parseImageUrls.map(async (item) => {
                const uidImagen = uid(32);
                return pool.query(`INSERT INTO relproductoimagen
                (
                    ecodRelProductoImagen,
                    iImagen,
                    ecodProductos,
                    tipoAlmacenamiento
                ) VALUES (?,?,?,?)`, [
                    uidImagen,
                    item,
                    idProduct,
                    "url"
                ]);
            }));
        }
        const parseSizesList = JSON.parse(sizesList);
        if(parseSizesList){
            await Promise.all(parseSizesList.map(async (item) => {
                if(item.isDelete){
                    return pool.query(`UPDATE relvariacionproducto
                    SET ecodEstatus = ? WHERE ecodVariacionproducto = ? limit 1`, [ STATUS_USER_DELETE, item.idSizeVariationProduct]);
                }
            }));
            await Promise.all(parseSizesList.map(async (item) => {
                if(item.isUpdate){
                    return pool.query(
                        `UPDATE relvariacionproducto
                        SET
                            bPrincipal = IFNULL(?, bPrincipal),
                            nPrecio = IFNULL(?, nPrecio),
                            nStock = IFNULL(?, nStock)
                        WHERE
                            ecodVariacionproducto = ?
                        LIMIT 1`,
                        [
                            item.isMain,
                            item.price,
                            item.stock,
                            item.idSizeVariationProduct
                        ]
                    );
                    
                }
            }));
            const uidVariacionproducto = uid(32);
            await Promise.all(parseSizesList.map(async (item) => {
                if(item.isNew){
                    return pool.query(`INSERT INTO relvariacionproducto
                    (
                        ecodVariacionproducto,
                        ecodTallavariacion,
                        ecodProductos,
                        nPrecio,
                        nStock,
                        bPrincipal 
                    ) VALUES (?,?,?,?,?,?)`, [
                        uidVariacionproducto,
                        item.idSizeVariation,
                        idProduct,
                        item.price,
                        item.stock,
                        item.isMain
                    ]);
                }
            }));
        }
        await connection.commit();
        return res.status(200).json({
            updated:true,
            message:SUCCESS_MESSAGE_UPDATE
        });
    } catch (error) {
        // Revertir la transacción en caso de error
        await Promise.all(imagensUpload.map(async (item) => {
            await cloudinary.uploader.destroy(item.public_id);
        }));
        if (connection) {
            await connection.rollback();
        }
        logger.error(error);
        return res.status(500).json({
            message: error
        });
    } finally {
        // Liberar la conexión de vuelta al pool
        if (connection) {
          connection.release();
        }
        clearFilesUpload(req.files);
    }
}