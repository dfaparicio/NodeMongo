import mongoose from "mongoose";
import { obtenerAhoraColombia } from "../helpers/fechas.js";

const pagoSchema = new mongoose.Schema({
  // Información básica
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date, default: obtenerAhoraColombia },
  descripcion: { type: String, default: "" },
  moneda: { type: String, default: "COP" },

  // Estado del pago
  estado: {
    type: String,
    enum: ["pendiente", "aprobado", "rechazado", "en_proceso", "cancelado"],
    default: "pendiente",
  },
  estadoDetalle: { type: String, default: "" },
  operationType: { type: String, default: "" }, // tipo de operación (regular_payment, money_transfer, etc.)

  // Información del método de pago
  metodoPago: { type: String, default: "" }, // payment_method_id (pse, credit_card, debit_card, etc.)
  tipoPago: { type: String, default: "" }, // payment_type_id (credit_card, debit_card, ticket, bank_transfer, etc.)

  // Información de la tarjeta (si aplica)
  ultimosDigitos: { type: String, default: "" }, // card.last_four_digits
  nombreTarjeta: { type: String, default: "" }, // card.holder.name
  bancoEmisor: { type: String, default: "" }, // card.issuer.name
  primerosDigitos: { type: String, default: "" }, // card.first_six_digits

  // Información del pagador
  pagadorEmail: { type: String, default: "" }, // payer.email
  pagadorNombre: { type: String, default: "" }, // payer.first_name
  pagadorApellido: { type: String, default: "" }, // payer.last_name
  pagadorNombreCompleto: { type: String, default: "" }, // payer.name
  tipoDocumento: { type: String, default: "" }, // payer.identification.type (CC, CE, TI, etc.)
  numeroDocumento: { type: String, default: "" }, // payer.identification.number

  // Fechas adicionales de Mercado Pago
  fechaCreacion: { type: Date, default: null }, // date_created
  fechaAprobacion: { type: Date, default: null }, // date_approved
  fechaLiberacion: { type: Date, default: null }, // money_release_date
  fechaUltimoMovimiento: { type: Date, default: null }, // date_last_updated

  // IDs de Mercado Pago
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
