import mongoose from "mongoose";

const LecturaSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: Number,
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
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Lectura = mongoose.model("Lectura", LecturaSchema);

export const lecturaPrincipal = async (usuarioId) => {
  const lecturaExistente = await Lectura.findOne({
    usuarioId,
    tipo: "principal",
  });

  const usuario = { id: usuarioId, nombre: "Usuario Ejemplo", estado: "activo", fecha_nacimiento: "2001-07-14" };

  return {
    usuario,
    lecturaExistente,
    crear: async (usuarioId, tipo, contenido) => {
      const nueva = await Lectura.create({ usuarioId, tipo, contenido });
      return nueva._id;
    },
    obtenerLecturaPrincipal: async (usuarioId) => {
      return await Lectura.findOne({ usuarioId, tipo: "principal" });
    },
    obtenerLecturaDiariaHoy: async (usuarioId) => {
      const hoy = new Date();
      const inicioDia = new Date(hoy.setHours(0, 0, 0, 0));
      const finDia = new Date(hoy.setHours(23, 59, 59, 999));

      return await Lectura.findOne({
        usuarioId,
        tipo: "diaria",
        fechaLectura: { $gte: inicioDia, $lte: finDia },
      });
    },
  };
};

export const lecturaDiaria = lecturaPrincipal;

export const lecturasdeUnUsuario = async (usuarioId) => {
  return await Lectura.find({ usuarioId }).sort({ fechaLectura: -1 });
};

export const lecturaPorId = async (id) => {
  return await Lectura.findById(id);
};
