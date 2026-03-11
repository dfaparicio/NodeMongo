import { configureMercadoPago, mercadopago } from "../config/mercadopago.js";
import Pago from "../models/pagos.js";
import Usuario from "../models/usuario.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const crearPreferencia = async (req, res) => {
  const { monto, titulo } = req.body;
  const usuarioId = req.usuario?._id || req.usuario?.id;

  if (!usuarioId) return res.status(401).json({ error: "Usuario no autenticado" });

  configureMercadoPago();

  try {
    const montoFinal = Number(monto) < 100 ? 2000 : Number(monto);

    const response = await mercadopago.preferences.create({
      items: [{ title: String(titulo || "Plan Numeris"), quantity: 1, unit_price: montoFinal, currency_id: "COP" }],
      back_urls: {
        success: "http://localhost:5173/pagos/exito",
        failure: "http://localhost:5173/pagos/fallo",
        pending: "http://localhost:5173/pagos/pendiente",
      },
      external_reference: usuarioId.toString()
    });

    // REGISTRO Y ACTIVACIÓN FORZADA
    try {
      const nuevoPago = new Pago({
        usuarioId: usuarioId.toString(),
        monto: montoFinal,
        descripcion: titulo || "Plan Numeris",
        estado: "pendiente",
        mpPreferenceId: response.body.id,
      });
      await nuevoPago.save();

      // ACTIVACIÓN DE BAJO NIVEL (Para evitar fallos de Mongoose)
      await Usuario.collection.updateOne(
        { _id: new mongoose.Types.ObjectId(usuarioId.toString()) },
        { $set: { estado: 1 } }
      );
      
      console.log(`✅ USUARIO ${usuarioId} ACTIVADO EXITOSAMENTE`);

    } catch (dbError) {
      console.error("⚠️ Error DB:", dbError.message);
    }

    res.json({
      success: true,
      init_point: response.body.init_point,
      sandbox_init_point: response.body.sandbox_init_point,
      id: response.body.id,
    });

  } catch (error) {
    res.status(500).json({ error: "Error MP", detalle: error.message });
  }
};

export const recibirNotificacion = async (req, res) => {
  const { topic, id } = req.query;
  if (topic === "payment") {
    try {
      configureMercadoPago();
      const payment = await mercadopago.payment.findById(id);
      if (payment.body.status === "approved") {
        const pago = await Pago.findOneAndUpdate(
          { mpPreferenceId: payment.body.preference_id },
          { estado: "aprobado", mpPaymentId: id },
          { new: true }
        );
        if (pago) {
          await Usuario.collection.updateOne(
            { _id: new mongoose.Types.ObjectId(pago.usuarioId) },
            { $set: { estado: 1 } }
          );
        }
      }
    } catch (e) { console.error("Error Webhook:", e); }
  }
  res.status(200).send("OK");
};

export const verificarPago = async (req, res) => {
  const { payment_id } = req.query;
  try {
    configureMercadoPago();
    const payment = await mercadopago.payment.findById(payment_id);
    if (payment.body.status === "approved") {
      const pago = await Pago.findOneAndUpdate(
        { mpPreferenceId: payment.body.preference_id },
        { estado: "aprobado", mpPaymentId: payment_id },
        { new: true }
      );
      let usuarioActualizado = null;
      if (pago) {
        await Usuario.collection.updateOne(
          { _id: new mongoose.Types.ObjectId(pago.usuarioId) },
          { $set: { estado: 1 } }
        );
        usuarioActualizado = await Usuario.findById(pago.usuarioId);
      }
      return res.json({ success: true, status: "approved", usuario: usuarioActualizado });
    }
    res.json({ success: false, status: payment.body.status });
  } catch (error) {
    res.status(500).json({ error: "Error Verificación" });
  }
};
