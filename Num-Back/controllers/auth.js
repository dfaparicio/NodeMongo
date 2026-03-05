import Usuario from "../models/usuario.js"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import generarJWT from "../helpers/generar-jwt.js"
import { enviarEmail, enviarBienvenida, enviarRecuperacion } from "../helpers/nodemailer.js"

// REGISTRO DE USUARIO PÚBLICO
export const registro = async (req, res) => {
    const { nombre, edad, fechanacimiento, email, password } = req.body
    try {
        // Crear usuario activo por defecto (sin verificación de email)
        const usuario = new Usuario({
            nombre, edad, fechanacimiento, email, password,
            rol: "USER_ROLE",
            estado: 0, // Activo inmediatamente
            emailVerificado: true // Verificado por defecto
        })

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt)

        await usuario.save()

        // Enviar email de bienvenida (Sin botón de verificación)
        await enviarBienvenida(email, nombre)

        // Generar JWT para que pueda usar la app inmediatamente
        const token = await generarJWT(usuario.id)

        res.status(201).json({
            usuario,
            token,
            msg: "¡Bienvenido al Cosmos! Revisa tu email para ver tu mensaje de bienvenida 🌠"
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Error al registrar usuario" })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(401).json({
                error: "Usuario no encontrado"
            })
        }
        const validPassword = bcrypt.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(401).json({
                error: "Contraseña incorrecta"
            })
        }
        const token = await generarJWT(usuario.id)
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al iniciar sesion"
        })
    }
}

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