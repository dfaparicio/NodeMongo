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

        // Ocultar contraseña en la respuesta
        const { password: pw, ...usuarioSinPassword } = usuario.toObject();

        res.json({ usuario: usuarioSinPassword, msg: "Usuario creado exitosamente 🌠" })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Error al crear usuario" })
    }
}

export const putUsuario = async (req, res) => {
    try {
        const { nombre, email, rol, edad, estado } = req.body
        const { id } = req.params

        const camposActualizar = {}
        if (nombre !== undefined) camposActualizar.nombre = nombre
        if (email !== undefined) camposActualizar.email = email
        if (rol !== undefined) camposActualizar.rol = rol
        if (edad !== undefined) camposActualizar.edad = edad
        if (estado !== undefined) camposActualizar.estado = estado

        const usuario = await Usuario.findByIdAndUpdate(id, camposActualizar, { new: true })

        res.json({ usuario, msg: "Usuario modificado correctamente" })
    } catch (error) {
        console.error("❌ Error en putUsuario:", error);
        res.status(400).json({ error: error.message || "Error al actualizar" });
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

export const cambiarPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { passwordActual, passwordNueva } = req.body;

        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Verificar contraseña actual
        const validPassword = bcrypt.compareSync(passwordActual, usuario.password);
        if (!validPassword) {
            return res.status(400).json({ error: "La contraseña actual es incorrecta" });
        }

        // Encriptar la nueva contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(passwordNueva, salt);

        await usuario.save();

        res.json({ msg: "Contraseña actualizada exitosamente ✨" });

    } catch (error) {
        console.error("❌ Error en cambiarPassword:", error);
        res.status(500).json({ error: "Error al cambiar la contraseña" });
    }
};