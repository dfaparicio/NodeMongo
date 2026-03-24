import { enviarEmail } from './nodemailer.js';

/**
 * Notificación de lectura diaria lista
 */
export const enviarCorreoNotificacion = async (emailDestino, nombreUsuario) => {
    try {
        const frontendURL = process.env.URL_FRONT || 'https://numerologia-astral.devscenter.online';
        const html = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0b0c0e; color: #ffffff; margin: 0; padding: 40px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #1a1c20; border-radius: 12px; overflow: hidden; border: 1px solid #2d2f36;">
                <tr>
                    <td style="padding: 40px 20px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                        <h1 style="color: #d4af37; margin: 0; font-size: 28px; letter-spacing: 4px; font-weight: 300;">NUMERIS</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 40px 30px;">
                        <h2 style="color: #ffffff; font-size: 22px; margin-bottom: 20px; font-weight: 400; text-align: center;">¡Hola, ${nombreUsuario}! ✨</h2>
                        <p style="color: #b0b3b8; font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 30px;">
                            Tu lectura diaria personalizada ya está disponible. Descubre lo que los números tienen preparado para ti hoy.
                        </p>
                        <div style="text-align: center;">
                            <a href="${frontendURL}/#/lectura_diaria" style="background-color: #d4af37; color: #0b0c0e; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block; letter-spacing: 1px;">SABER MI LECTURA DE HOY</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; background-color: rgba(212, 175, 55, 0.05);">
                        <p style="font-size: 12px; color: #6b6f76; margin: 0;">&copy; 2026 Numeris Astral. Todos los derechos reservados.</p>
                    </td>
                </tr>
            </table>
        </div>
        `;
        await enviarEmail(emailDestino, '✨ Tu lectura diaria está lista', html);
    } catch (error) {
        console.error('❌ Error enviando correo de notificación:', error.message);
    }
};

/**
 * Envío de recibo de pago
 */
export const enviarFacturaCorreo = async (emailDestino, nombreUsuario, pago) => {
    try {
        const fechaFactura = new Date(pago.fecha).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
        const montoFormateado = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(pago.monto);
        
        const html = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0b0c0e; color: #ffffff; margin: 0; padding: 40px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #1a1c20; border-radius: 12px; overflow: hidden; border: 1px solid #2d2f36;">
                <tr>
                    <td style="padding: 40px 20px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                        <h1 style="color: #d4af37; margin: 0; font-size: 28px; letter-spacing: 4px; font-weight: 300;">NUMERIS</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 40px 30px;">
                        <h2 style="color: #ffffff; font-size: 22px; margin-bottom: 20px; font-weight: 400;">Confirmación de Pago</h2>
                        <p style="color: #b0b3b8; font-size: 16px; margin-bottom: 25px;">Hola ${nombreUsuario}, hemos procesado con éxito tu transacción.</p>
                        
                        <div style="background-color: rgba(212, 175, 55, 0.05); padding: 25px; border-radius: 8px; border: 1px dashed rgba(212, 175, 55, 0.3);">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="color: #6b6f76; font-size: 14px; padding-bottom: 10px;">Fecha:</td>
                                    <td style="color: #ffffff; font-size: 14px; text-align: right; padding-bottom: 10px;">${fechaFactura}</td>
                                </tr>
                                <tr>
                                    <td style="color: #6b6f76; font-size: 14px; padding-bottom: 10px;">Servicio:</td>
                                    <td style="color: #ffffff; font-size: 14px; text-align: right; padding-bottom: 10px;">${pago.descripcion}</td>
                                </tr>
                                <tr style="border-top: 1px solid rgba(212, 175, 55, 0.2);">
                                    <td style="color: #d4af37; font-size: 18px; font-weight: bold; padding-top: 15px;">Total:</td>
                                    <td style="color: #d4af37; font-size: 18px; font-weight: bold; text-align: right; padding-top: 15px;">${montoFormateado}</td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; background-color: rgba(212, 175, 55, 0.05);">
                        <p style="font-size: 12px; color: #6b6f76; margin: 0;">&copy; 2026 Numeris Astral. Todos los derechos reservados.</p>
                    </td>
                </tr>
            </table>
        </div>
        `;
        await enviarEmail(emailDestino, `✨ Confirmación de pago - Numeris`, html);
        return true;
    } catch (error) {
        console.error('❌ Error enviando factura:', error.message);
        throw error;
    }
};

/**
 * Envío de lectura principal completa
 */
export const enviarLecturaPrincipalCorreo = async (emailDestino, nombreUsuario, lectura) => {
    try {
        const { numero, descripcion, talentos, mensaje } = lectura.contenido;
        const html = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0b0c0e; color: #ffffff; margin: 0; padding: 40px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 650px; background-color: #1a1c20; border-radius: 12px; overflow: hidden; border: 1px solid #d4af37;">
                <tr>
                    <td style="padding: 40px 20px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                        <h1 style="color: #d4af37; margin: 0; font-size: 28px; letter-spacing: 4px; font-weight: 300;">NUMERIS</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 40px 30px;">
                        <h2 style="color: #ffffff; font-size: 24px; margin-bottom: 25px; font-weight: 400; text-align: center;">Tu Lectura Principal: El Camino del ${numero} ✨</h2>
                        
                        <div style="text-align: center; margin-bottom: 40px;">
                            <div style="display: inline-block; width: 80px; height: 80px; line-height: 80px; border-radius: 50%; border: 1px solid #d4af37; color: #d4af37; font-size: 32px; font-weight: 300; background: rgba(212, 175, 55, 0.05);">${numero}</div>
                            <p style="color: #d4af37; font-size: 10px; letter-spacing: 3px; font-weight: bold; margin-top: 10px; text-transform: uppercase;">Misión de Vida</p>
                        </div>

                        <div style="margin-bottom: 30px;">
                            <h3 style="color: #d4af37; font-size: 18px; font-weight: 400; border-bottom: 1px solid rgba(212, 175, 55, 0.1); padding-bottom: 8px;">Esencia del Camino</h3>
                            <p style="color: #b0b3b8; font-size: 15px; line-height: 1.8; text-align: justify;">${descripcion}</p>
                        </div>

                        <div style="margin-bottom: 30px; background: rgba(212, 175, 55, 0.03); padding: 20px; border-left: 3px solid #d4af37; border-radius: 4px;">
                            <h3 style="color: #d4af37; font-size: 18px; font-weight: 400; margin-top: 0;">Tus Dones Celestiales</h3>
                            <p style="color: #ffffff; font-size: 15px; line-height: 1.8; margin-bottom: 0;">${talentos}</p>
                        </div>

                        <div style="margin-bottom: 10px;">
                            <h3 style="color: #d4af37; font-size: 18px; font-weight: 400; border-bottom: 1px solid rgba(212, 175, 55, 0.1); padding-bottom: 8px;">Mensaje Estelar</h3>
                            <p style="color: #b0b3b8; font-size: 15px; line-height: 1.8; font-style: italic;">"${mensaje}"</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 30px; text-align: center; background-color: rgba(212, 175, 55, 0.05);">
                        <p style="font-size: 12px; color: #6b6f76; margin: 0; line-height: 1.5;">
                            Este es un mapa de tu alma. Guárdalo y consúltalo cuando necesites recordar tu luz.<br>
                            &copy; 2026 Numeris Astral.
                        </p>
                    </td>
                </tr>
            </table>
        </div>
        `;
        await enviarEmail(emailDestino, `✨ Tu Lectura Principal - Misión de Vida ${numero}`, html);
        return true;
    } catch (error) {
        console.error('❌ Error enviando lectura principal:', error.message);
        throw error;
    }
};

/**
 * Aviso de que el plan vencerá en 5 días
 */
export const enviarAvisoExpiracion = async (emailDestino, nombreUsuario, fechaVencimiento) => {
    try {
        const frontendURL = process.env.URL_FRONT || 'https://numerologia-astral.devscenter.online';
        const fechaFormateada = new Date(fechaVencimiento).toLocaleDateString('es-CO', { day: 'numeric', month: 'long' });
        
        const html = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0b0c0e; color: #ffffff; margin: 0; padding: 40px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #1a1c20; border-radius: 12px; overflow: hidden; border: 1px solid rgba(212, 175, 55, 0.3);">
                <tr>
                    <td style="padding: 40px 20px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                        <h1 style="color: #d4af37; margin: 0; font-size: 28px; letter-spacing: 4px; font-weight: 300;">NUMERIS</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 40px 30px; text-align: center;">
                        <h2 style="color: #ffffff; font-size: 22px; margin-bottom: 20px; font-weight: 400;">Tu Conexión se debilita, ${nombreUsuario} ⏳</h2>
                        <p style="color: #b0b3b8; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                            Los astros nos indican que tu acceso premium al portal expirará el próximo <strong>${fechaFormateada}</strong> (en 5 días). 
                            No permitas que tu flujo de sabiduría diaria se interrumpa.
                        </p>
                        <div style="text-align: center;">
                            <a href="${frontendURL}/#/planes" style="background-color: #d4af37; color: #0b0c0e; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block; letter-spacing: 1px;">RENOVAR MI ALINEACIÓN</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; background-color: rgba(212, 175, 55, 0.05);">
                        <p style="font-size: 12px; color: #6b6f76; margin: 0;">&copy; 2026 Numeris Astral. Evita que tu luz se apague.</p>
                    </td>
                </tr>
            </table>
        </div>
        `;
        await enviarEmail(emailDestino, '⏳ Aviso Importante: Tu plan Numeris vence pronto', html);
    } catch (error) {
        console.error('❌ Error enviando aviso expiración:', error.message);
    }
};

/**
 * Notificación de plan finalizado (Inactivo)
 */
export const enviarPlanFinalizado = async (emailDestino, nombreUsuario) => {
    try {
        const frontendURL = process.env.URL_FRONT || 'https://numerologia-astral.devscenter.online';
        const html = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0b0c0e; color: #ffffff; margin: 0; padding: 40px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #1a1c20; border-radius: 12px; overflow: hidden; border: 1px solid #ff4444;">
                <tr>
                    <td style="padding: 40px 20px; text-align: center; border-bottom: 1px solid rgba(255, 68, 68, 0.2);">
                        <h1 style="color: #ff4444; margin: 0; font-size: 28px; letter-spacing: 4px; font-weight: 300;">NUMERIS</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 40px 30px; text-align: center;">
                        <h2 style="color: #ffffff; font-size: 22px; margin-bottom: 20px; font-weight: 400;">Tu Ciclo Premium ha concluido ✨</h2>
                        <p style="color: #b0b3b8; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                            Hola ${nombreUsuario}, tu acceso al portal ha regresado al nivel básico. Tus lecturas profundas y mensajes avanzados han sido pausados hasta tu próxima alineación.
                        </p>
                        <div style="text-align: center;">
                            <a href="${frontendURL}/#/planes" style="border: 1px solid #d4af37; color: #d4af37; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block; letter-spacing: 1px;">VOLVER A ACTIVARME</a>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center; background-color: rgba(255, 68, 68, 0.05);">
                        <p style="font-size: 12px; color: #6b6f76; margin: 0;">Tu camino sigue, pero tu guía premium te espera.</p>
                    </td>
                </tr>
            </table>
        </div>
        `;
        await enviarEmail(emailDestino, '✨ Tu ciclo en Numeris ha concluido', html);
    } catch (error) {
        console.error('❌ Error enviando correo fin plan:', error.message);
    }
};
