import nodemailer from 'nodemailer';

export const enviarCorreoNotificacion = async (emailDestino, nombreUsuario) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.EMAIL_USER2, 
        pass: process.env.EMAIL_PASS2, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER2,
      to: emailDestino,
      subject: '¡Tu lectura diaria está lista! ✨',
      text: `Hola ${nombreUsuario}, tu lectura diaria ya fue generada con éxito y está activada en tu dashboard. ¡Ve a revisarla!`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Correo de confirmación enviado a ${emailDestino}`);
  } catch (error) {
    console.error('❌ Error enviando correo:', error.message);
  }
};