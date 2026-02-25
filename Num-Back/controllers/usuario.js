import Usuario from "../models/usuario.js"
import bcrypt from "bcryptjs"
import { enviarEmail } from "../helpers/nodemailer.js"
import crypto from "crypto"

export const getUsuario = async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.json({ usuarios })
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const getUsuarioEmail = async (req, res) => {
    try {
        const { email } = req.query
        const usuarios = await Usuario.find({ email })
        res.json({ usuarios })
    } catch (error) {
        res.status(400).json({ error })
    }
}

export const postUsuario = async (req, res) => {
    try {
        const { nombre, edad, fechanacimiento, email, password, rol } = req.body

        const usuario = new Usuario({
            nombre, edad, fechanacimiento, email, password, rol
        })

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save()

        // Generar token y enviar email de verificación
        const tokenVerificacion = crypto.randomBytes(32).toString("hex")
        usuario.resetToken = tokenVerificacion
        await usuario.save()

        await enviarEmail(
            email,
            "Verifica tu cuenta",
            `<h2>Bienvenido ${nombre}</h2>
             <p>Haz clic en el enlace para verificar tu email:</p>
             <a href="http://localhost:5040/api/auth/confirmar/${tokenVerificacion}">Verificar mi email</a>`
        )

        res.json({ usuario, msg: "Usuario creado. Revisa tu email para verificar tu cuenta" })

    } catch (error) {
        res.status(400).json({ error })
    }
}

export const putUsuario = async (req, res) => {
    try {
        const { nombre } = req.body
        const { id } = req.params

        await Usuario.findByIdAndUpdate(id, { nombre })

        res.json({ msg: "Usuario modificado correctamente" })
    } catch (error) {
        res.status(400).json({ error })
    }


}

export const putUsuarioActivar = async (req, res) => {
    try {
        const { id } = req.params

        await Usuario.findByIdAndUpdate(id, { estado: 1 })

        res.json({ msg: "Usuario activado correctamente" })
    } catch (error) {
        res.status(400).json({ error })
    }


}

export const putUsuarioInactivar = async (req, res) => {
    try {
        const { id } = req.params

        await Usuario.findByIdAndUpdate(id, { estado: 0 })

        res.json({ msg: "Usuario inactivado correctamente" })
    } catch (error) {
        res.status(400).json({ error })
    }


}

export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params

        await Usuario.findByIdAndDelete(id)

        res.json({ msg: "Usuario eliminado correctamente" })
    } catch (error) {
        res.status(400).json({ error })
    }
}