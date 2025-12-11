import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({
  usuarioId: {
    type: String,
    required: true
  },
  monto: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  descripcion: {
    type: String,
    default: ""
  }
});

const Pago = mongoose.model("Pago", pagoSchema);

// 👉 EXPORTACIÓN DEFAULT PARA EL MODELO
export default Pago;

// 👉 EXPORTACIONES NOMBRADAS PARA LAS FUNCIONES
export const obtenerPagos = async () => {
  return await Pago.find();
};

export const obtenerPagosUsuario = async (idUsuario) => {
  return await Pago.find({ usuarioId: idUsuario });
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
    estado: tienePagos ? "Activo" : "Sin pagos"
  };
};
