import { Router } from "express";
import {
  getPagos,
  getPagoUsuario,
  postNuevoPago,
  deletePago,
  getEstadoUsuario,
  enviarFactura
} from "../controllers/pagos.js";

import {
  validarIdPago,
  validarPostPago
} from "../middlewares/validarPagos.js";

import { verificarPagoExiste } from "../middlewares/verificarPagoExiste.js";

const router = Router();

// GET ALL
router.get("/", getPagos);

// GET BY ID (USUARIO)
router.get("/:id", [validarIdPago], getPagoUsuario);

// GET STATUS (USUARIO)
router.get("/estado/:id", [validarIdPago], getEstadoUsuario);

// CREATE NEW PAYMENT
router.post("/", [validarPostPago], postNuevoPago);

// SEND INVOICE
router.post('/enviar-factura', enviarFactura);

// DELETE PAYMENT
router.delete("/:id", [validarIdPago, verificarPagoExiste], deletePago);

export default router;
