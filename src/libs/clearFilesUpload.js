import { promises as fsPromises } from 'fs';
export const clearFilesUpload = async (files) =>{
    for (const file of files) {
        try {
            const data = await fsPromises.readFile(file.path, 'utf-8');
            await fsPromises.unlink(file.path);
        } catch (error) {
            console.error('Error al leer o eliminar el archivo:', error);
        }
    }
}