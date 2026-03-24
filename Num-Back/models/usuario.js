import mongoose from "mongoose";
import { obtenerAhoraColombia } from "../helpers/fechas.js";

const usuario = new mongoose.Schema({
    nombre: { type: String, required: true },
    edad: { type: Number },
    fechanacimiento: { type: Date, default: obtenerAhoraColombia },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    rol: { type: String, required: true, default: 'USER_ROLE', enum: ['ADMIN_ROLE', 'USER_ROLE', 'OTHER_ROLE'] },
    estado: { type: Number, default: 0 },//0 inactivo   1 activo
    fechaExpiracion: { type: Date, default: null }, // Nueva fecha de expiración
    emailVerificado: { type: Boolean, default: false },
    resetToken: { type: String, default: null },
    resetTokenExpira: { type: Date, default: null },
});

export default mongoose.model("Usuario", usuario)