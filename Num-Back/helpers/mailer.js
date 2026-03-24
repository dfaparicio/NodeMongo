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
 * Envío de factura electrónica profesional (DevsCenter S.A.S)
 */
export const enviarFacturaCorreo = async (emailDestino, nombreUsuario, pago) => {
    try {
        const fechaFactura = new Date(pago.fecha).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
        const montoFormateado = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(pago.monto);
        const idFactura = pago.mpPaymentId || (pago._id ? pago._id.toString().slice(-8).toUpperCase() : 'DEVS-' + Math.random().toString(36).substr(2, 5).toUpperCase());
        const cufe = (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)).toUpperCase();

        const html = `
        <div style="background-color: #0b0c0e; padding: 40px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 650px; background-color: #1a1c20; border-radius: 8px; overflow: hidden; border: 1px solid #2d2f36; color: #ffffff;">
                <!-- Decoración Superior -->
                <tr><td height="5" style="background: linear-gradient(to right, #d4af37, #f4af25, #d4af37);"></td></tr>
                
                <!-- Encabezado -->
                <tr>
                    <td style="padding: 40px; border-bottom: 1px solid rgba(255,255,255,0.05);">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td width="60%">
                                    <h1 style="color: #d4af37; margin: 0; font-size: 22px; letter-spacing: 4px; font-weight: bold; font-family: 'Georgia', serif;">NUMERIS</h1>
                                    <p style="color: #6b6f76; font-size: 10px; margin: 5px 0; letter-spacing: 1px; text-transform: uppercase;">DevsCenter S.A.S - NIT: 901.452.128-5</p>
                                    <p style="color: #6b6f76; font-size: 10px; margin: 2px 0;">Cra. 43A #1-50, Medellín, Colombia</p>
                                </td>
                                <td width="40%" align="right">
                                    <span style="color: #d4af37; font-size: 10px; text-transform: uppercase; letter-spacing: 2px;">Factura Electrónica</span>
                                    <h2 style="color: #ffffff; margin: 0; font-size: 18px;">N° ${idFactura}</h2>
                                    <p style="color: #6b6f76; font-size: 10px; margin: 5px 0;">${fechaFactura}</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <!-- Información de Facturación -->
                <tr>
                    <td style="padding: 30px 40px; background-color: rgba(255,255,255,0.01);">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td width="50%" valign="top">
                                    <h3 style="color: #d4af37; font-size: 9px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; border-bottom: 1px solid rgba(212, 175, 55, 0.2); display: inline-block;">Adquiriente</h3>
                                    <p style="color: #ffffff; font-size: 14px; margin: 5px 0; font-weight: bold;">${nombreUsuario}</p>
                                    <p style="color: #b0b3b8; font-size: 12px; margin: 2px 0;">Usuario Portal Numeris</p>
                                    <p style="color: #b0b3b8; font-size: 11px; margin: 2px 0;">Estado: Alineación Premium Activa</p>
                                </td>
                                <td width="50%" valign="top" style="padding-left: 20px;">
                                    <h3 style="color: #d4af37; font-size: 9px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; border-bottom: 1px solid rgba(212, 175, 55, 0.2); display: inline-block;">Detalles de Pago</h3>
                                    <p style="color: #b0b3b8; font-size: 12px; margin: 5px 0;">Método: Mercado Pago Online</p>
                                    <p style="color: #b0b3b8; font-size: 11px; margin: 2px 0;">Moneda: COP - Peso Colombiano</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <!-- Tabla de Items -->
                <tr>
                    <td style="padding: 20px 40px;">
                        <table width="100%" border="0" cellpadding="15" cellspacing="0" style="border-top: 1px solid rgba(255,255,255,0.1);">
                            <tr>
                                <td style="color: #6b6f76; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">Descripción del Servicio Astral</td>
                                <td align="right" style="color: #6b6f76; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">Total</td>
                            </tr>
                            <tr>
                                <td style="border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff; font-size: 14px;">
                                    ${pago.descripcion || 'Sincronización Astral Premium'}
                                    <br><span style="color: #6b6f76; font-size: 10px;">Acceso ilimitado por ciclo mensual.</span>
                                </td>
                                <td align="right" style="border-bottom: 1px solid rgba(255,255,255,0.05); color: #d4af37; font-size: 16px; font-weight: bold;">
                                    ${montoFormateado}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <!-- Resumen y QR -->
                <tr>
                    <td style="padding: 20px 40px 40px 40px;">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td width="150" align="center" style="background-color: #ffffff; padding: 10px; border-radius: 4px;">
                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://numerologia-astral.devscenter.online/factura/${idFactura}&bgcolor=ffffff" width="100" height="100" alt="QR Factura" style="display: block;">
                                    <p style="color: #000000; font-size: 7px; margin-top: 5px; text-transform: uppercase; font-weight: bold;">Validación Digital</p>
                                </td>
                                <td valign="bottom" align="right">
                                    <table width="200" border="0" cellpadding="5" cellspacing="0">
                                        <tr>
                                            <td style="color: #6b6f76; font-size: 12px;">Subtotal</td>
                                            <td align="right" style="color: #ffffff; font-size: 12px;">${montoFormateado}</td>
                                        </tr>
                                        <tr>
                                            <td style="color: #6b6f76; font-size: 12px;">IVA (0%)</td>
                                            <td align="right" style="color: #ffffff; font-size: 12px;">$0</td>
                                        </tr>
                                        <tr>
                                            <td style="color: #d4af37; font-size: 18px; font-weight: bold; border-top: 1px solid #d4af37; padding-top: 10px;">TOTAL</td>
                                            <td align="right" style="color: #d4af37; font-size: 18px; font-weight: bold; border-top: 1px solid #d4af37; padding-top: 10px;">${montoFormateado}</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <!-- Pie de Página Legal -->
                <tr>
                    <td style="padding: 30px 40px; background-color: #121418; border-top: 1px solid #2d2f36;">
                        <p style="color: #4a4d52; font-size: 8px; line-height: 1.5; text-transform: uppercase; margin: 0;">
                            Representación gráfica de factura electrónica. La firma digital garantiza la integridad según decreto 2242 de 2015. 
                            DevsCenter S.A.S no responde por desalineaciones externas.
                        </p>
                        <div style="background-color: #000; padding: 5px; margin-top: 10px; font-family: monospace; font-size: 8px; color: #333; word-break: break-all;">
                            CUFE: ${cufe}
                        </div>
                        <p style="color: #2d2f36; font-size: 9px; font-weight: bold; text-align: center; margin-top: 15px;">
                            GRACIAS POR CONFIAR EN TU DESTINO • DEVSCENTER S.A.S
                        </p>
                    </td>
                </tr>
            </table>
        </div>
        `;
        await enviarEmail(emailDestino, `✨ Factura Electrónica N° ${idFactura} - Numeris`, html);
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
