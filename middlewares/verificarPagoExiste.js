import Pago from "../models/pagos.js"; 

export const verificarPagoExiste = async (req, res, next) => {
  try {
    const pago = await Pago.findById(req.params.id);

    if (!pago) {
      return res.status(404).json({ error: "El pago no existe" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ error: "Error al verificar el pago" });
  }
};