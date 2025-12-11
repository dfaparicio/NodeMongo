import Usuario from "../models/usuario.js";

// Validar si existe el usuario por ID
export const validarExisteUsuario = async (id) => {
    const existeId = await Usuario.findById(id);
    if (!existeId) {
        throw new Error(`El usuario con ID ${id} no está registrado`);
    }
}

// Validar si un email ya está registrado
export const validarEmail = async (email) => {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error(`El correo ${email} ya está registrado`);
    }
}

// Validar si el usuario está ACTIVO
export const validarUsuarioActivo = async (id) => {
    const usuario = await Usuario.findById(id);

    if (!usuario) {
        throw new Error(`El usuario con ID ${id} no existe`);
    }

    if (usuario.estado === 0) {
        throw new Error(`El usuario ${id} está inactivo`);
    }
}


