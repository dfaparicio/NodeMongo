import { check } from "express-validator";
import { validarCampos } from "./validarCampos.js";

export const validarUsuarioId = [
    check("usuarioId", "El usuarioId es obligatorio").notEmpty(),
    check("usuarioId", "ID inválido de MongoDB").isMongoId(),
    validarCampos,
];

export const validarIdLectura = [
    check("id", "El ID es obligatorio").notEmpty(),
    check("id", "ID inválido de MongoDB").isMongoId(),
    validarCampos,
];

export const validarEnviarEmailLectura = [
    check("email", "El email es obligatorio").isEmail(),
    check("lectura", "La lectura es obligatoria").notEmpty(),
    validarCampos,
];
