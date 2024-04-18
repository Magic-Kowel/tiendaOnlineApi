import { Client } from "basic-ftp"
export default async function uploadFileFTP(listFiles){
    const client = new Client()
        client.ftp.verbose = true
        try {
            await client.access({
                host: "ftp.pijamasbonitas.com",
                user: "u718653009.josueftp",
                password: "Josuemagico1",
                secure: false,
                port: 21,
                secureOptions: {
                    servername: 'ftp.pijamasbonitas.com'
                }
            });
            for (const archivo of listFiles) {
                const currentDate = new Date();
                const filePath = archivo.path;
                const remotePath = `/img/${currentDate.toISOString()}`;
                await client.uploadFrom(filePath, remotePath);
                console.log(`Archivo ${currentDate} subido correctamente.`);
            }
        }
        catch(err) {
            console.log(err)
        }
        client.close()
}