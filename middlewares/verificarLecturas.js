import Lectura from "../models/lecturas.js";

export const verificarLectura = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      msg: "El cuerpo de la petición (body) es obligatorio",
    });
  }

  const { contenido } = req.body;

  if (!contenido || contenido.trim() === "") {
    return res.status(400).json({
      msg: "El contenido es obligatorio",
    });
  }

  next();
};

export const verificarLecturaPrincipal = async (req, res, next) => {
  const { usuarioId } = req.params;

  try {
    const lectura = await Lectura.findOne({
      usuarioId: usuarioId,
      tipo: "principal",
    });

    if (lectura) {
      return res.status(400).json({
        msg: "El usuario ya tiene una lectura principal",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ msg: "Error al verificar la lectura principal" });
  }
};
