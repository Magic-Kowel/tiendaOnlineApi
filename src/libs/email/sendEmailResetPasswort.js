import nodemailer from 'nodemailer';
import { 
  EMAIL_USER,
  EMAIL_PASSWORD,
  PORT_EMAIL,
  HOST_EMAIL 
} from '../../config.js';

import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
export async function sendEmailResetPasswort(emailObject) {
  try {
    const transporter = nodemailer.createTransport({
      host: HOST_EMAIL,
      secure: false,
      port: PORT_EMAIL,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Cargar la plantilla de correo electrónico
    const emailTemplate = fs.readFileSync(
      path.resolve('src/templatesEmail/sendEmailResetPasswort.hbs'),
      'utf8'
    );
    const renderEmail = handlebars.compile(emailTemplate);
    const attachments = [
      {
        filename: 'image-1.jpeg',
        path: path.resolve('src/templatesEmail/images/image-1.jpeg'),
        cid: 'image1',
      },
    ];

    // Compilar la plantilla de Handlebars
    const mailOptions = {
      from: EMAIL_USER,
      to: emailObject.email,
      subject: emailObject.subject,
      html: renderEmail(emailObject.data),
      attachments: attachments,
    };

    // Envía el correo electrónico y espera la respuesta
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.response);
    return info; // Devuelve la información del envío
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw error; // Relanza el error para manejarlo en el contexto de la llamada a la función
  }
}