import {
  obtenerPagos,
  obtenerPagosUsuario,
  registrarPago,
  eliminarPago,
  verificarEstadoUsuario
} from "../models/pagos.js";
import Usuario from "../models/usuario.js";
import { enviarFacturaCorreo } from "../helpers/mailer.js";

export const getPagos = async (req, res) => {
  try {
    const pagos = await obtenerPagos();
    res.json(pagos);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener los pagos" });
  }
};

export const getPagoUsuario = async (req, res) => {
  try {
    const pago = await obtenerPagosUsuario(req.params.id);
    if (!pago || pago.length === 0) {
      return res.json([]);
    }
    res.json(pago);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener el pago" });
  }
};

export const postNuevoPago = async (req, res) => {
  try {
    const nuevoPago = await registrarPago(req.body);
    
    // ACTIVACIÓN DEL USUARIO (Solo si el pago es aprobado)
    if (nuevoPago && nuevoPago.usuarioId && nuevoPago.estado === 'aprobado') {
      console.log(`Activando usuario ${nuevoPago.usuarioId} por pago aprobado`);
      await Usuario.updateOne(
        { _id: nuevoPago.usuarioId }, 
        { $set: { estado: 1 } }
      );
    }

    res.status(201).json(nuevoPago);
  } catch (error) {
    console.error("Error en postNuevoPago:", error);
    res.status(400).json({ error: "Error al registrar el pago" });
  }
};

export const deletePago = async (req, res) => {
  try {
    const pagoEliminado = await eliminarPago(req.params.id);
    if (!pagoEliminado) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }
    res.json({ eliminado: pagoEliminado });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el pago" });
  }
};

export const getEstadoUsuario = async (req, res) => {
  try {
    const estado = await verificarEstadoUsuario(req.params.id);
    res.json(estado);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener estado del usuario" });
  }
};

export const enviarFactura = async (req, res) => {
  const { email, nombre, pago } = req.body;
  try {
    await enviarFacturaCorreo(email, nombre, pago);
    res.json({ msg: 'Factura enviada con éxito' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al enviar la factura' });
  }
};
