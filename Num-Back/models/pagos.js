import mongoose from "mongoose";
import { obtenerAhoraColombia } from "../helpers/fechas.js";

const pagoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date, default: obtenerAhoraColombia },
  descripcion: { type: String, default: "" },
  estado: {
    type: String,
    enum: ["pendiente", "aprobado", "rechazado", "en_proceso"],
    default: "pendiente",
  },
  metodoPago: { type: String, default: "" },
  tipoPago: { type: String, default: "" },
  ultimosDigitos: { type: String, default: "" },
  estadoDetalle: { type: String, default: "" },
  moneda: { type: String, default: "COP" },
  mpPaymentId: { type: String, default: "" },
  mpPreferenceId: { type: String, default: "" },
});

const Pago = mongoose.model("Pago", pagoSchema);

export default Pago;

export const obtenerPagos = async () => {
  return await Pago.find().populate("usuarioId", "nombre email");
};

export const obtenerPagosUsuario = async (idUsuario) => {
  return await Pago.find({ usuarioId: idUsuario }).populate("usuarioId", "nombre email");
};

export const registrarPago = async (data) => {
  const pago = new Pago(data);
  return await pago.save();
};

export const eliminarPago = async (id) => {
  return await Pago.findByIdAndDelete(id);
};

export const verificarEstadoUsuario = async (idUsuario) => {
  const tienePagos = await Pago.exists({ usuarioId: idUsuario });
  return {
    usuarioId: idUsuario,
    estado: tienePagos ? "Activo" : "Sin pagos",
  };
};
