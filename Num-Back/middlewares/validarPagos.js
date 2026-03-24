import { check } from "express-validator";
import { validarCampos } from "./validarCampos.js";

export const validarIdPago = [
    check("id", "ID inválido de MongoDB").isMongoId(),
    validarCampos,
];

export const validarPostPago = [
    check("usuarioId", "El ID del usuario es obligatorio").isMongoId(),
    check("monto", "El monto debe ser un número positivo").isNumeric(),
    validarCampos,
];
