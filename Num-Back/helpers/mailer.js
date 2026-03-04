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
      from: `"Numeris 🌠" <${process.env.EMAIL_USER2}>`,
      to: emailDestino,
      subject: '¡Tu lectura diaria está lista! ✨',
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
            <div style="background: #0b0c0e; padding: 20px; text-align: center; color: #f2a900;">
                <h1 style="margin:0; letter-spacing: 2px;">NUMERIS</h1>
            </div>
            <div style="padding: 30px; line-height: 1.6;">
                <h2 style="color: #0b0c0e;">¡Hola, ${nombreUsuario}! ✨</h2>
                <p>Las estrellas se han movido y tu mensaje para hoy ha sido revelado.</p>
                <p>Tu lectura diaria ya está disponible en tu dashboard. Te invitamos a descubrir qué energías te acompañarán en este nuevo ciclo.</p>
                
                <div style="text-align: center; margin: 40px 0;">
                    <a href="http://localhost:5173/#/lectura_diaria" 
                       style="background: #f2a900; color: #0b0c0e; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                       SABER MI LECTURA DE HOY
                    </a>
                </div>
                
                <p style="font-style: italic; color: #666;">"Los números son el lenguaje universal del alma."</p>
                <hr style="border:0; border-top: 1px solid #eee; margin: 30px 0;">
                <p style="font-size: 0.8em; color: #999; text-align: center;">
                    © 2026 Numeris. Todas las estrellas alineadas.
                </p>
            </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Correo de confirmación enviado a ${emailDestino}`);
  } catch (error) {
    console.error('❌ Error enviando correo:', error.message);
  }
};
