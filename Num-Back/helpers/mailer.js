import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER2,
    pass: process.env.EMAIL_PASS2,
  },
});

// Notificación de lectura diaria lista
export const enviarCorreoNotificacion = async (emailDestino, nombreUsuario) => {
  try {
    const frontendURL = process.env.URL_FRONT || 'https://numerologiaastral.jagsnexus.site';
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
                <p>Tu lectura diaria ya está disponible en tu dashboard.</p>
                <div style="text-align: center; margin: 40px 0;">
                    <a href="${frontendURL}/#/lectura_diaria" 
                       style="background: #f2a900; color: #0b0c0e; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                       SABER MI LECTURA DE HOY
                    </a>
                </div>
                <p style="font-size: 0.8em; color: #999; text-align: center;">© 2026 Numeris.</p>
            </div>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('❌ Error enviando correo:', error.message);
  }
};

// Envío de recibo de pago
export const enviarFacturaCorreo = async (emailDestino, nombreUsuario, pago) => {
  try {
    const fechaFactura = new Date(pago.fecha).toLocaleDateString('es-CO');
    const montoFormateado = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(pago.monto);
    const mailOptions = {
      from: `"Numeris 🌠" <${process.env.EMAIL_USER2}>`,
      to: emailDestino,
      subject: `Tu recibo de pago - Numeris ✨`,
      html: `
        <div style="font-family: sans-serif; padding: 40px; background: #f4f4f5;">
          <div style="background: #ffffff; padding: 40px; border-radius: 8px; border-top: 8px solid #270075;">
            <h1 style="color: #270075;">NUMERIS</h1>
            <p>Hola ${nombreUsuario}, aquí tienes el detalle de tu transacción:</p>
            <div style="background: #f8fafc; padding: 20px; border-radius: 5px;">
              <p><strong>Fecha:</strong> ${fechaFactura}</p>
              <p><strong>Servicio:</strong> ${pago.descripcion}</p>
              <p style="font-size: 18px; color: #270075;"><strong>Total: ${montoFormateado}</strong></p>
            </div>
          </div>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('❌ Error enviando factura:', error.message);
    throw error;
  }
};

// Envío de lectura principal completa
export const enviarLecturaPrincipalCorreo = async (emailDestino, nombreUsuario, lectura) => {
  try {
    const { numero, descripcion, talentos, mensaje } = lectura.contenido;
    const fecha = new Date(lectura.fechaLectura).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
    const mailOptions = {
      from: `"Numeris 🌠" <${process.env.EMAIL_USER2}>`,
      to: emailDestino,
      subject: `Tu Lectura Principal - El Camino del ${numero} ✨`,
      html: `
        <body style="background-color: #0b0c0e; font-family: sans-serif; color: #ffffff; padding: 20px;">
          <table align="center" width="580" style="background-color: #1a1c20; border-radius: 15px; border: 1px solid #d4af37;">
            <tr><td style="padding: 30px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
              <h1 style="color: #d4af37;">NUMERIS</h1>
            </td></tr>
            <tr><td style="padding: 30px;">
              <h2>Hola, ${nombreUsuario} ✨</h2>
              <div style="text-align: center; margin: 30px 0;">
                <div style="width: 100px; height: 100px; line-height: 100px; border-radius: 50%; border: 2px solid #d4af37; color: #d4af37; font-size: 40px; font-weight: bold; margin: auto;">${numero}</div>
                <p style="color: #d4af37; font-size: 11px; letter-spacing: 2px; font-weight: bold;">CAMINO DE VIDA</p>
              </div>
              <h3 style="color: #d4af37; border-left: 2px solid #d4af37; padding-left: 10px;">Descripción</h3>
              <p style="color: #dddddd; line-height: 1.6;">${descripcion}</p>
              <h3 style="color: #d4af37; border-left: 2px solid #d4af37; padding-left: 10px;">Tus Talentos</h3>
              <p style="color: #ffffff; background: rgba(212, 175, 55, 0.1); padding: 12px; border-radius: 8px;">${talentos}</p>
              <h3 style="color: #d4af37; border-left: 2px solid #d4af37; padding-left: 10px;">Mensaje Estelar</h3>
              <p style="color: #dddddd; line-height: 1.6;">${mensaje}</p>
            </td></tr>
          </table>
        </body>
      `,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('❌ Error enviando lectura principal:', error.message);
    throw error;
  }
};