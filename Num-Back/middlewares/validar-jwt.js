import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.js";
import Pago from "../models/pagos.js"; // Importamos pagos para validar existencia

const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }

    try {
        const secret = process.env.SECRETORPRIVATEKEY_LOCAL || process.env.SECRETORPRIVATEKEY;
        const { id } = jwt.verify(token, secret);

        let usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(401).json({ msg: 'Token no válido - usuario no existe en DB' });
        }

        // --- SISTEMA DE AUTO-LIMPIEZA Y PERSISTENCIA REAL ---
        // Si el usuario figura como "Activo" (1), vamos a validar si es REALMENTE activo
        if (usuario.estado === 1) {
            const ahora = new Date();
            const expirado = usuario.fechaExpiracion && new Date(usuario.fechaExpiracion) < ahora;

            // Verificamos si tiene al menos un pago aprobado en la DB
            const tienePagoValido = await Pago.exists({ 
                usuarioId: usuario._id.toString(), 
                estado: "aprobado" 
            });

            if (expirado || !tienePagoValido) {
                console.warn(`🚩 [Auto-Cleanup] Inactivando usuario ${usuario._id}. Motivo: ${expirado ? 'Suscripción expirada' : 'No se encontró registro de pago'}`);

                // Actualizamos el estado en la base de datos
                usuario = await Usuario.findByIdAndUpdate(
                    usuario._id, 
                    { $set: { estado: 0 } }, 
                    { new: true }
                );
            }
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        });
    }
}

export default validarJWT;