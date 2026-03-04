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
        console.log(`✅ Correo enviado a ${to}`);
    } catch (error) {
        console.error("❌ Error al enviar correo:", error);
        throw error;
    }
};


export const enviarBienvenida = async (to, nombre) => {
    const html = `
    <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
        <div style="background: #0b0c0e; padding: 20px; text-align: center; color: #f2a900;">
            <h1 style="margin:0; letter-spacing: 2px;">NUMERIS</h1>
        </div>
        <div style="padding: 30px; line-height: 1.6;">
            <h2 style="color: #0b0c0e;">¡Bienvenido al Cosmos, ${nombre}! 🌠</h2>
            <p>Tu viaje hacia el autodescubrimiento a través de la numerología ha comenzado oficialmente.</p>
            <p>Tu cuenta ha sido activada con éxito. Ya puedes acceder a todas nuestras herramientas para descubrir el mapa que las estrellas han trazado para ti.</p>
            
            <div style="text-align: center; margin: 40px 0;">
                <a href="http://localhost:5173/#/dashboard" 
                   style="background: #f2a900; color: #0b0c0e; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                   IR A MI DASHBOARD
                </a>
            </div>
            
            <p>Estamos emocionados de acompañarte en este camino de luz y números.</p>
            <hr style="border:0; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 0.8em; color: #999; text-align: center;">
                © 2026 Numeris. Todas las estrellas alineadas.
            </p>
        </div>
    </div>
    `;

    await enviarEmail(to, "¡Bienvenido a Numeris! Tu viaje comienza ahora 🌠", html);
};
