import Usuario from "../models/usuario.js"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import generarJWT from "../helpers/generar-jwt.js"
import { enviarEmail, enviarBienvenida, enviarRecuperacion } from "../helpers/nodemailer.js"
import { procesarFechaNacimiento } from "../helpers/fechas.js"

// REGISTRO DE USUARIO PÚBLICO
export const registro = async (req, res) => {
    const { nombre, edad, fechanacimiento, email, password } = req.body
    try {
        // Verificar si el email ya existe
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({ error: "Este email ya está en uso" });
        }

        // --- MEJORA: Ajustar fecha de nacimiento a Zona Horaria Colombia ---
        const fechaAjustada = procesarFechaNacimiento(fechanacimiento);

        // Crear usuario (estado 0 = inicial/sin pago)
        const usuario = new Usuario({
            nombre, 
            edad, 
            fechanacimiento: fechaAjustada, 
            email, 
            password,
            rol: "USER_ROLE",
            estado: 0, // Inicia sin pago por defecto
            emailVerificado: true
        })

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save()

        // Enviar email de bienvenida (Sin await para no bloquear la respuesta)
        enviarBienvenida(email, nombre).catch(err => console.error("❌ Error enviando bienvenida:", err.message));

        // Generar JWT
        const token = await generarJWT(usuario.id)

        // Limpiar el objeto usuario para no enviar el password al frontend
        const { password: pw, ...usuarioSinPassword } = usuario.toObject();

        res.status(201).json({
            usuario: usuarioSinPassword,
            token,
            msg: "¡Bienvenido al Cosmos! Revisa tu email para ver tu mensaje de bienvenida 🌠"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error interno al registrar usuario" })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(401).json({
                error: "Credenciales incorrectas"
            })
        }
        const validPassword = bcrypt.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(401).json({
                error: "Credenciales incorrectas"
            })
        }
        const token = await generarJWT(usuario.id)

        // Ocultar contraseña en la respuesta
        const { password: pw, ...usuarioSinPassword } = usuario.toObject();

        res.json({
            usuario: usuarioSinPassword,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error interno al iniciar sesión"
        })
    }
}

import Lectura from "../models/lecturas.js";
import Pago from "../models/pagos.js";

// RENOVAR TOKEN Y OBTENER PERFIL COMPLETO (Sincronización Real)
export const renewToken = async (req, res) => {
    const usuario = req.usuario;

    try {
        // Buscamos sus datos relacionados
        const [lecturasRaw, pagos] = await Promise.all([
            Lectura.find({ usuarioId: usuario.id }).sort({ fechaLectura: -1 }),
            Pago.find({ usuarioId: usuario.id }).sort({ fecha: -1 })
        ]);

        // --- MEJORA: Parsear contenido de lecturas para el Frontend ---
        const lecturas = lecturasRaw.map(l => {
            const lecturaObj = l.toObject();
            try {
                // Si es string, lo parseamos. Si ya es objeto, lo dejamos igual.
                lecturaObj.contenido = typeof l.contenido === 'string' ? JSON.parse(l.contenido) : l.contenido;
            } catch (e) {
                console.error("Error parseando contenido de lectura:", l._id);
            }
            return lecturaObj;
        });

        const token = await generarJWT(usuario.id);
        const { password: pw, ...usuarioSinPassword } = usuario.toObject();

        res.json({
            usuario: usuarioSinPassword,
            lecturas,
            pagos,
            token
        });
    } catch (error) {
        console.error("Error en renewToken:", error);
        res.status(500).json({ error: "Error al sincronizar datos" });
    }
};

// VERIFICAR EMAIL
export const verificarEmail = async (req, res) => {
    const { token } = req.params
    try {
        const usuario = await Usuario.findOne({ resetToken: token })
        if (!usuario) {
            return res.status(400).json({ error: "Token inválido" })
        }
        usuario.emailVerificado = true
        usuario.resetToken = null
        await usuario.save()
        res.json({ msg: "Email verificado correctamente" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error al verificar email" })
    }
}
// RECUPERAR CONTRASEÑA (envía email con token)
export const recuperarPassword = async (req, res) => {
    const { email } = req.body
    try {
        const usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(404).json({ error: "No existe un usuario con ese email" })
        }
        const token = crypto.randomBytes(32).toString("hex")
        usuario.resetToken = token
        usuario.resetTokenExpira = new Date(Date.now() + 3600000) // 1 hora
        await usuario.save()

        await enviarRecuperacion(email, token)
        res.json({ msg: "Se envió un email con las instrucciones" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error al enviar email" })
    }
}
// ESTABLECER NUEVA CONTRASEÑA
export const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    try {
        const usuario = await Usuario.findOne({
            resetToken: token,
            resetTokenExpira: { $gt: Date.now() }
        })
        if (!usuario) {
            return res.status(400).json({ error: "Token inválido o expirado" })
        }
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)
        usuario.resetToken = null
        usuario.resetTokenExpira = null
        await usuario.save()
        res.json({ msg: "Contraseña actualizada correctamente" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error al actualizar contraseña" })
    }
}