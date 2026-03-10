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

export const enviarLecturaPrincipalCorreo = async (emailDestino, nombreUsuario, lectura) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER2,
        pass: process.env.EMAIL_PASS2,
      },
    });

    const { numero, descripcion, talentos, mensaje } = lectura.contenido;
    const fecha = new Date(lectura.fechaLectura).toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const mailOptions = {
      from: `"Numeris 🌠" <${process.env.EMAIL_USER2}>`,
      to: emailDestino,
      subject: `Tu Lectura Principal - El Camino del ${numero} ✨`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0b0c0e; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #ffffff;">
          <table width="100%" bgcolor="#0b0c0e" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
            <tr>
              <td>
                <table align="center" width="600" style="background: linear-gradient(145deg, #1a1c20 0%, #0b0c0e 100%); border-radius: 20px; border: 1px solid #d4af37; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
                  <!-- Header -->
                  <tr>
                    <td style="padding: 40px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                      <h1 style="margin: 0; color: #d4af37; letter-spacing: 5px; font-size: 28px; text-transform: uppercase;">NUMERIS</h1>
                      <p style="color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 2px; margin-top: 10px;">REVELACIÓN DEL CAMINO DE VIDA</p>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <h2 style="color: #ffffff; font-size: 22px; margin-bottom: 5px;">Hola, ${nombreUsuario} ✨</h2>
                      <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 30px;">Tu lectura ha sido procesada por las estrellas el ${fecha}.</p>
                      
                      <!-- Número Central -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 40px;">
                        <tr>
                          <td align="center">
                            <div style="width: 120px; height: 120px; line-height: 120px; border-radius: 50%; border: 2px solid #d4af37; color: #d4af37; font-size: 48px; font-weight: bold; text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);">
                              ${numero}
                            </div>
                            <p style="color: #d4af37; font-size: 12px; letter-spacing: 3px; margin-top: 15px; font-weight: bold;">TU NÚMERO MAESTRO</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Secciones -->
                      <div style="margin-bottom: 30px;">
                        <h3 style="color: #d4af37; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; border-left: 3px solid #d4af37; padding-left: 15px;">Descripción</h3>
                        <p style="color: rgba(255,255,255,0.8); line-height: 1.8; font-size: 15px;">${descripcion}</p>
                      </div>

                      <div style="margin-bottom: 30px;">
                        <h3 style="color: #d4af37; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; border-left: 3px solid #d4af37; padding-left: 15px;">Tus Talentos</h3>
                        <p style="color: #ffffff; background: rgba(212, 175, 55, 0.1); padding: 15px; border-radius: 10px; line-height: 1.8; font-size: 15px; font-style: italic;">${talentos}</p>
                      </div>

                      <div style="margin-bottom: 40px;">
                        <h3 style="color: #d4af37; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; border-left: 3px solid #d4af37; padding-left: 15px;">Mensaje de las Estrellas</h3>
                        <p style="color: rgba(255,255,255,0.8); line-height: 1.8; font-size: 15px;">${mensaje}</p>
                      </div>

                      <div style="text-align: center; border-top: 1px solid rgba(212, 175, 55, 0.1); padding-top: 30px;">
                        <p style="font-size: 12px; color: rgba(255,255,255,0.4); font-style: italic;">"Los números no mienten, solo esperan ser escuchados."</p>
                      </div>
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
    console.error('❌ Error enviando lectura por correo:', error.message);
    throw error;
  }
};