import nodemailer from 'nodemailer';
import { EMAIL_USER,EMAIL_PASSWORD } from '../config.js';

import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
export function sendEmail(emailObject){
  // console.log(emailObject);
  // Configura el transporte de correo

  const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    secure: false, // Establece secure en false para usar TLS
    port:587,
    auth: {
      user: EMAIL_USER, 
      pass: EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false // Desactiva la verificación del certificado SSL
    }
  });
  // Cargar la plantilla de correo electrónico
  const emailTemplate = fs.readFileSync(path.resolve('src/templatesEmail/verifyUser.hbs'), 'utf8');
  const renderEmail = handlebars.compile(emailTemplate);
  const attachments = [{
    filename: 'image-1.jpeg',
    path: path.resolve('src/templatesEmail/images/image-1.jpeg'), // Ruta local de la imagen
    cid: 'image1' // Identificador de la imagen embebida
  }];
  // Compilar la plantilla de Handlebars
  const mailOptions = {
    from: EMAIL_USER, // Cambia esto a tu dirección de correo
    to: emailObject.email, // Cambia esto a la dirección de correo del destinatario
    subject: emailObject.subject,
    html: renderEmail(emailObject.data),
    attachments:attachments
    // text: emailObject.message
  };
  
  // Envía el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
}