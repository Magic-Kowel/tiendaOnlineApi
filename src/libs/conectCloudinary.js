export const conectCloudinary = (cloudinary) =>{
    return cloudinary.config({ 
        cloud_name: 'ddyldtxfs',
        api_key: '558652121984667',
        api_secret: 'xKZmAP9gkYujOx8g6JuTsSQEas8',
        secure: true,
        folder: 'magicImages'
    });
}