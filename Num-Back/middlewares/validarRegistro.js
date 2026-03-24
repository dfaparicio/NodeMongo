import { check } from "express-validator";
import { validarEmail } from "../helpers/usuarios.js";
import { validarCampos } from "./validarCampos.js";

export const validarRegistro = [
    check('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 5, max: 50 }).withMessage('El nombre debe tener entre 5 y 50 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El nombre solo puede contener letras y espacios'),
    
    check('email')
        .trim()
        .isEmail().withMessage('Debe proporcionar un correo electrónico válido')
        .custom(validarEmail),
    
    check('password')
        .trim()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    
    check('fechanacimiento')
        .notEmpty().withMessage('La fecha de nacimiento es obligatoria'),
    
    validarCampos
];

export const validarLogin = [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
];

export const validarRecuperacion = [
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos
];

export const validarNuevoPassword = [
    check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
    validarCampos
];
