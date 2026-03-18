import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER2,
        pass: process.env.EMAIL_PASS2,
    },
});

export const enviarEmail = async (to, subject, html) => {
    try {
        await transport.sendMail({
            from: `"Numeris 🌠" <${process.env.EMAIL_USER2}>`,
            to,
            subject,
            html,
        });
    } catch (error) {
        console.error("❌ Error al enviar correo:", error);
        throw error;
    }
};

// Correo de bienvenida tras registro
export const enviarBienvenida = async (to, nombre) => {
    const frontendURL = process.env.URL_FRONT || 'https://numerologiaastral.jagsnexus.site';
    const html = `
    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
        <div style="background: #0b0c0e; padding: 20px; text-align: center; color: #f2a900;">
            <h1 style="margin:0;">NUMERIS</h1>
        </div>
        <div style="padding: 30px; line-height: 1.6;">
            <h2>¡Bienvenido al Cosmos, ${nombre}! 🌠</h2>
            <p>Tu viaje hacia el autodescubrimiento ha comenzado oficialmente.</p>
            <div style="text-align: center; margin: 40px 0;">
                <a href="${frontendURL}/#/perfil" style="background: #f2a900; color: #0b0c0e; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">IR A MI PERFIL</a>
            </div>
            <p style="font-size: 0.8em; color: #999; text-align: center;">© 2026 Numeris.</p>
        </div>
    </div>
    `;
    await enviarEmail(to, "¡Bienvenido a Numeris! Tu viaje comienza ahora 🌠", html);
};

// Correo con enlace de recuperación de contraseña
export const enviarRecuperacion = async (to, token) => {
    const frontendURL = process.env.URL_FRONT || 'https://numerologiaastral.jagsnexus.site';
    const resetUrl = `${frontendURL}/#/reset-password/${token}`;
    const html = `
    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
        <div style="background: #0b0c0e; padding: 20px; text-align: center; color: #f2a900;">
            <h1 style="margin:0;">NUMERIS</h1>
        </div>
        <div style="padding: 30px; line-height: 1.6;">
            <h2>Restablecer Contraseña 🔑</h2>
            <p>Haz clic en el siguiente botón para elegir una nueva llave cósmica. Expira en 1 hora.</p>
            <div style="text-align: center; margin: 40px 0;">
                <a href="${resetUrl}" style="background: #f2a900; color: #0b0c0e; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">RESTABLECER MI CONTRASEÑA</a>
            </div>
            <p style="font-size: 0.8em; color: #999; text-align: center;">© 2026 Numeris.</p>
        </div>
    </div>
    `;
    await enviarEmail(to, "Recuperar tu conexión cósmica - Numeris", html);
};