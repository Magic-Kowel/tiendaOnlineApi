import { pool } from "../../db.js"
import { uid } from "uid";
import logger from "../../libs/logger.js"
import { SUCCESS_MESSAGE_INSERT, NOT_VALID_IMAGES } from "../../messagesSystem.js";
import { STATUS_USER_ACTIVE } from "../../config.js";
import { v2 as cloudinary } from 'cloudinary';
import { conectCloudinary } from "../../libs/conectCloudinary.js";
import { clearFilesUpload } from "../../libs/clearFilesUpload.js";
// import admin from 'firebase-admin';
// import * as fs from 'fs';
// import path  from 'path'
// import { createClient } from '@supabase/supabase-js';
import validateSize from "../../libs/validateSize.js";
// import serviceAccount from '../../../keyFirebaseUploadImagens.json' assert { type: "json" }
export const createProduct = async (req,res) =>{
    conectCloudinary(cloudinary);
    // admin.initializeApp({
    //     credential: admin.credential.cert(path.resolve(process.cwd(),"./keyFirebaseUploadImagens.json")),
    //     storageBucket: 'gs://imagenes-4347a.appspot.com' // Reemplaza con la URL de tu bucket de Firebase Storage
    // });
    // const bucket = admin.storage().bucket();
    const supabaseUrl = 'https://bpsjuxuukcblxesqbbir.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwc2p1eHV1a2NibHhlc3FiYmlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMDM4MjcsImV4cCI6MjAyOTY3OTgyN30.0k53qnSphxx28-b2bRo985bbH03klHCNDZCh9ha102g';
    // const supabase = createClient(supabaseUrl, supabaseKey);
    if ((!req.files || req.files.length === 0 ) && (!req.body.imageUrls || req.body.imageUrls.length ===0)) {
        return res.status(400).json({ message: "No se han proporcionado alguna imagen" });
    }
    let connection;
    const imagensUpload = [];
    try {
        for (const file of req.files) {
            const isValidSize = validateSize(file.size)
            if(!isValidSize){
                continue;
            }
            try {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'magicImages' });
                imagensUpload.push(result);
            } catch (error) {
                console.error("Error al procesar un archivo:", error);
                imagensUpload.push({ message: "Error al procesar el archivo" });
            }
 
            // const reponse = await bucket.upload(file.path, {
            //     destination: "prueba",
            //     // Opcional: especificar metadatos para el archivo
            //     metadata: {
            //         contentType: 'image/jpeg', // Cambia el tipo de contenido según el tipo de archivo
            //         metadata: {
            //             custom: 'metadata'
            //         }
            //     }
            // });
      
                // Sube la imagen al almacenamiento de Supabase
            // console.log(file);
            //     const { data, error } = await supabase.storage
            //     .from('imagenes')
            //     .upload(file.originalname, file.path, { contentType: file.mimetype });
            //     if (data) {
            //         console.log(data);
            //     } else {
            //     console.log(error);
            //     }
            // return
        }
        if(imagensUpload.length === 0){
            return res.status(500).json({
                message: NOT_VALID_IMAGES
            });
        }
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const uidProducto = uid(32);
        const {
            description,
            idGender,
            idMaterial,
            idSubCategory,
            nameProduct,
            sizesList,
            imageUrls
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
        const parseSizesList = JSON.parse(sizesList);
        const parseImageUrls = JSON.parse(imageUrls);
        const isMainTrue = parseSizesList.some(size => size.isMain === true);
        await Promise.all(parseSizesList.map(async (item, index) => {
            const uidVariacionproducto = uid(32);
            let isMainValue = item.isMain; // Valor predeterminado basado en el elemento actual
            // Si ninguno de los elementos tiene isMain como true y es el primer elemento, establece isMain en true
            if (!isMainTrue && index === 0) {
                isMainValue = true;
            }
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
                uidProducto,
                item.price,
                item.stock,
                isMainValue
            ]);
        }));
        console.log("3");
        await Promise.all(imagensUpload.map(async (item) => {
            const uidImagen = uid(32);
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
                uidProducto,
                "servicio",
                item.public_id
            ]);
        }));
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
                    uidProducto,
                    "url"
                ]);
            }));
        }
        await connection.commit();
        return res.status(200).json({
            created:true,
            message:SUCCESS_MESSAGE_INSERT
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