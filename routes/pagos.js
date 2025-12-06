import { Router } from "express";
import {
  getPagos,
  getPagoUsuario,
  postNuevoPago,
  deletePago,
  getEstadoUsuario,
} from "../controllers/pagoscontrollers.js";

const router = Router();

router.get("/api/pago", getPagos);

router.get("/api/pago/:id", getPagoUsuario);

router.post("/api/pago", postNuevoPago);

router.delete("/api/pago/:id", deletePago);

router.get("/api/pago/estado/:id", getEstadoUsuario);

export default router;
