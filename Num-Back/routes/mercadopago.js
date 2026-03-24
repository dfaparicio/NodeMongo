import { Router } from "express";
import {
  crearPreferencia,
  recibirNotificacion,
  verificarPago,
  consultarEstadoPago
} from "../controllers/mercadopago.js";
import validarJWT from "../middlewares/validar-jwt.js";

const router = Router();

// Endpoint para generar el botón de pago
router.post("/create-preference", validarJWT, crearPreferencia);

// Endpoint para que el frontend confirme si el pago se hizo
router.get("/verify-payment", validarJWT, verificarPago);

// Nuevo: Para consultar estado sin depender de redirección (Polling)
router.get("/check-status", validarJWT, consultarEstadoPago);

// Webhook para notificaciones automáticas de Mercado Pago (OPCIONAL EN LOCAL)
router.post("/webhook", recibirNotificacion);
router.get("/webhook", recibirNotificacion);

export default router;
