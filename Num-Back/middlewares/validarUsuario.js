import { check } from "express-validator";
import mongoose from "mongoose";
import Usuario from "../models/usuario.js";
import { validarCampos } from "./validarCampos.js";
import { validarEmail, validarExisteUsuario, validarRol } from "../helpers/usuarios.js";

// Validaciones de Schema/Express-Validator
export const validarGetUsuarioEmail = [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "Formato de email no válido").isEmail(),
    validarCampos,
];

export const validarCambiarPassword = [
    check("id", "ID inválido").isMongoId(),
    check("id").custom(validarExisteUsuario),
    check("passwordActual", "La contraseña actual es obligatoria").notEmpty(),
    check("passwordNueva", "La nueva contraseña debe tener al menos 8 caracteres").isLength({ min: 8 }),
    validarCampos,
];

export const validarPostUsuario = [
    check("nombre", "El nombre es obligatorio y debe tener entre 5 y 50 caracteres")
      .trim()
      .notEmpty()
      .isLength({ min: 5, max: 50 })
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El nombre solo puede contener letras y espacios'),
    
    check("edad", "La edad debe ser numérica").optional().isNumeric(),
    check("fechanacimiento", "La fecha no es válida").optional().isISO8601().toDate(),
    check("email", "Debe ser un email válido").isEmail(),
    check("email").custom(validarEmail),
    check("password", "La contraseña debe tener al menos 8 caracteres").isLength({ min: 8 }),
    check("rol").optional().custom(validarRol),
    validarCampos,
];

export const validarPutUsuario = [
    check("id", "ID inválido").isMongoId(),
    check("id").custom(validarExisteUsuario),
    validarCampos,
];

export const validarIdUsuario = [
    check("id", "ID inválido").isMongoId(),
    check("id").custom(validarExisteUsuario),
    validarCampos,
];

// Middlewares manuales (Legacy/Custom)
export const validarIdMongo = (req, res, next) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: `El ID ${id} no es un ID válido de MongoDB`
        });
    }
    next();
};

export const validarUsuarioActivoMiddleware = async (req, res, next) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({
                error: `El usuario con ID ${id} no existe`
            });
        }

        if (usuario.estado === 0) {
            return res.status(400).json({
                error: `El usuario con ID ${id} está inactivo`
            });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error verificando el estado del usuario"
        });
    }
};
