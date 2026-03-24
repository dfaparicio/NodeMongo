import { Resend } from 'resend';
import 'dotenv/config';

// Configuración oficial de Resend con tu dominio profesional verificado
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * REMITENTE PROFESIONAL: numerologia-astral.devscenter.online
 * Este es el correo que verán tus usuarios.
 */
const FROM_EMAIL = 'Numeris <hola@numerologia-astral.devscenter.online>';

/**
 * Función base para envío de correos con Resend (Motor Profesional)
 */
export const enviarEmail = async (to, subject, html) => {
    try {
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: [to],
            subject,
            html,
        });

        if (error) {
            console.error("❌ Error de Resend:", error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error("❌ Error al enviar correo:", error);
        throw error;
    }
};

/**
 * Correo de bienvenida tras registro exitoso
 */
export const enviarBienvenida = async (to, nombre) => {
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
                    <h2 style="color: #ffffff; font-size: 24px; margin-bottom: 20px; font-weight: 400; text-align: center;">¡Bienvenido al Cosmos, ${nombre}! 🌠</h2>
                    <p style="color: #b0b3b8; font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 30px;">
                        Tu viaje hacia el autodescubrimiento y la sabiduría astral ha comenzado oficialmente. Estamos encantados de acompañarte en este camino de luz.
                    </p>
                    <div style="text-align: center;">
                        <a href="${frontendURL}/#/perfil" style="background-color: #d4af37; color: #0b0c0e; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block; letter-spacing: 1px;">EXPLORAR MI PERFIL</a>
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
    await enviarEmail(to, "✨ ¡Bienvenido a Numeris! Tu viaje comienza ahora", html);
};

/**
 * Correo con enlace de recuperación de contraseña
 */
export const enviarRecuperacion = async (to, token) => {
    const frontendURL = process.env.URL_FRONT || 'https://numerologia-astral.devscenter.online';
    const resetUrl = `${frontendURL}/#/reset-password/${token}`;
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
                    <h2 style="color: #ffffff; font-size: 22px; margin-bottom: 20px; font-weight: 400; text-align: center;">Restablecer Contraseña 🔑</h2>
                    <p style="color: #b0b3b8; font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 30px;">
                        Has solicitado restablecer tu acceso al portal astral. Haz clic en el botón de abajo para elegir una nueva llave cósmica. Este enlace expirará en 1 hora.
                    </p>
                    <div style="text-align: center;">
                        <a href="${resetUrl}" style="background-color: #d4af37; color: #0b0c0e; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block; letter-spacing: 1px;">RESTABLECER CONTRASEÑA</a>
                    </div>
                    <p style="color: #6b6f76; font-size: 14px; text-align: center; margin-top: 30px;">
                        Si no solicitaste este cambio, puedes ignorar este correo con seguridad.
                    </p>
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
    await enviarEmail(to, "🔑 Recuperar tu conexión cósmica - Numeris", html);
};
