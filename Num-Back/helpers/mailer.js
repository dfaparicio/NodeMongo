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

    const frontendURL = process.env.URL_FRONT || 'http://localhost:5173';
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
                    <a href="${frontendURL}/#/lectura_diaria" 
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


const formatoPesosBackend = (valor) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(valor).replace(/[a-zA-Z]/g, '').trim();
};

export const enviarFacturaCorreo = async (emailDestino, nombreUsuario, pago) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER2,
        pass: process.env.EMAIL_PASS2,
      },
    });

    // Formateamos los datos antes de meterlos al HTML
    const fechaFactura = new Date(pago.fecha).toLocaleDateString('es-CO');
    
    // USAMOS LA FUNCIÓN QUE DEFINIMOS ARRIBA
    const montoFormateado = formatoPesosBackend(pago.monto);
    
    const idFactura = pago._id || Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const descripcion = pago.descripcion || 'Servicio de Numerología';

    const mailOptions = {
      from: `"Numeris 🌠" <${process.env.EMAIL_USER2}>`,
      to: emailDestino,
      subject: `Tu recibo de pago #${idFactura} - Numeris ✨`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: sans-serif;">
          <table width="100%" bgcolor="#f4f4f5" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
            <tr>
              <td>
                <table align="center" width="600" bgcolor="#ffffff" cellpadding="0" cellspacing="0" style="border-radius: 8px; border-top: 8px solid #270075; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 40px;">
                      <h1 style="margin: 0; color: #270075; letter-spacing: 2px;">NUMERIS</h1>
                      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                      <h2 style="font-size: 18px;">¡Hola, ${nombreUsuario}! ✨</h2>
                      <p>Aquí tienes el detalle de tu transacción:</p>
                      
                      <table width="100%" style="background: #f8fafc; padding: 20px; border-radius: 5px;">
                        <tr>
                          <td><strong>Factura:</strong></td>
                          <td align="right">#${idFactura}</td>
                        </tr>
                        <tr>
                          <td><strong>Fecha:</strong></td>
                          <td align="right">${fechaFactura}</td>
                        </tr>
                        <tr>
                          <td><strong>Servicio:</strong></td>
                          <td align="right">${descripcion}</td>
                        </tr>
                        <tr style="font-size: 18px; color: #270075;">
                          <td style="padding-top: 10px;"><strong>Total:</strong></td>
                          <td align="right" style="padding-top: 10px;"><strong>$ ${montoFormateado}</strong></td>
                        </tr>
                      </table>
                      
                      <p style="margin-top: 30px; font-size: 12px; color: #64748b; text-align: center;">
                        Sede Central: San Gil, Santander, Colombia.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('❌ Error enviando factura:', error.message);
    throw error;
  }
};