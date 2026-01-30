import Lectura from "../models/lecturas.js";

export const verificarLectura = (req, res, next) => {
  const { contenido } = req.body;

  if (!contenido || contenido.trim() === "") {
    return res.status(400).json({
      msg: "El contenido es obligatorio",
    });
  }

  next();
};

export const verificarLecturaPrincipal = async (req, res, next) => {
  const { usuario_id } = req.params;

  try {
    const lectura = await Lectura.findOne({
      usuarioId: usuario_id,
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
