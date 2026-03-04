import Usuario from "../models/usuario.js"
import bcrypt from "bcryptjs"
import { enviarBienvenida } from "../helpers/nodemailer.js"

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

        // Crear usuario activo por defecto
        const usuario = new Usuario({
            nombre, edad, fechanacimiento, email, password,
            rol: rol || 'USER_ROLE',
            estado: 0, // Activo inmediatamente
            emailVerificado: true // Verificado por defecto
        })

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save()

        // Enviar email de bienvenida (Nuevo diseño)
        await enviarBienvenida(email, nombre)

        res.json({ usuario, msg: "Usuario creado exitosamente 🌠" })

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