import mongoose from "mongoose";
import Usuario from "./usuario.js";
import { obtenerAhoraColombia } from "../helpers/fechas.js";

const LecturaSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    tipo: {
      type: String,
      enum: ["principal", "diaria"],
      required: true,
    },
    contenido: {
      type: String,
      required: true,
    },
    fechaLectura: {
      type: Date,
      default: obtenerAhoraColombia,
    },
    fechaReferencia: {
      type: String, // Formato "YYYY-MM-DD"
      required: false,
    }
  },
  { timestamps: true }
);

// Índice único para evitar duplicados de lecturas diarias por usuario y día
LecturaSchema.index({ usuarioId: 1, tipo: 1, fechaReferencia: 1 }, { unique: true, partialFilterExpression: { tipo: "diaria" } });

const Lectura = mongoose.model("Lectura", LecturaSchema);

export default Lectura;

export const lecturaPrincipal = async (idUsuario) => {
  const lecturaExistente = await Lectura.findOne({
    usuarioId: idUsuario,
    tipo: "principal",
  }).populate("usuarioId", "nombre email");

  const usuario = await Usuario.findById(idUsuario);

  return {
    usuario,
    lecturaExistente,
    crear: async (usuarioId, tipo, contenido, fechaReferencia = null) => {
      const nueva = await Lectura.create({ usuarioId, tipo, contenido, fechaReferencia });
      return nueva._id;
    },
    obtenerLecturaPrincipal: async (usuarioId) => {
      return await Lectura.findOne({ usuarioId, tipo: "principal" }).populate("usuarioId", "nombre email");
    },
    obtenerLecturaDiariaHoy: async (usuarioId, fechaReferencia) => {
      return await Lectura.findOne({
        usuarioId,
        tipo: "diaria",
        fechaReferencia
      }).populate("usuarioId", "nombre email");
    },
  };
};

export const lecturaDiaria = lecturaPrincipal;

export const lecturasdeUnUsuario = async (usuarioId) => {
  return await Lectura.find({ usuarioId }).populate("usuarioId", "nombre email").sort({ fechaLectura: -1 });
};

export const lecturaPorId = async (id) => {
  return await Lectura.findById(id);
};
