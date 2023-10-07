import nodemailer from 'nodemailer';
import { EMAIL_USER,EMAIL_PASSWORD } from '../config.js';
export function sendEmail(emailObject){
  console.log(emailObject);
  // Configura el transporte de correo
  const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    auth: {
      user: EMAIL_USER, 
      pass: EMAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: EMAIL_USER, // Cambia esto a tu dirección de correo
    to: emailObject.email, // Cambia esto a la dirección de correo del destinatario
    subject: emailObject.subject,
    text: emailObject.message
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