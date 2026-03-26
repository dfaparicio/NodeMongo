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
import validarJWT from "../middlewares/validar-jwt.js";
import { esAdminRole } from "../middlewares/validar-rol.js";

const router = Router();

// GET ALL (Solo Admin)
router.get("/", [validarJWT, esAdminRole], getPagos);

// GET BY ID (USUARIO) - Requiere JWT
router.get("/:id", [validarJWT, validarIdPago], getPagoUsuario);

// GET STATUS (USUARIO) - Requiere JWT
router.get("/estado/:id", [validarJWT, validarIdPago], getEstadoUsuario);

// CREATE NEW PAYMENT - Requiere JWT
router.post("/", [validarJWT, validarPostPago], postNuevoPago);

// SEND INVOICE - Solo Admin
router.post('/enviar-factura', [validarJWT, esAdminRole], enviarFactura);

// DELETE PAYMENT - Solo Admin
router.delete("/:id", [validarJWT, esAdminRole, validarIdPago, verificarPagoExiste], deletePago);

export default router;
