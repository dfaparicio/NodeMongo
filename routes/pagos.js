import { Router } from "express";
import {
  getPagos,
  getPagoUsuario,
  postNuevoPago,
  deletePago,
  getEstadoUsuario,
} from "../controllers/pagos.js";

import { validarPago } from "../helpers/pagos.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { verificarPagoExiste } from "../middlewares/verificarPagoExiste.js";

const router = Router();

router.get("/", getPagos);

router.get("/:id", getPagoUsuario);

router.post(
  "/",
  (req, res, next) => { req.errores = validarPago(req.body); next(); },
  validarCampos,
  postNuevoPago
);

router.delete("/:id", verificarPagoExiste, deletePago);

router.get("/estado/:id", getEstadoUsuario);

export default router;
