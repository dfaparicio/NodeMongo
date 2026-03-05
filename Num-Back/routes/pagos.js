import { Router } from "express";
import { check } from "express-validator"; // Importación necesaria
import {
  getPagos,
  getPagoUsuario,
  postNuevoPago,
  deletePago,
  getEstadoUsuario,
  enviarFactura
} from "../controllers/pagos.js";

import { validarCampos } from "../middlewares/validarCampos.js";
import { verificarPagoExiste } from "../middlewares/verificarPagoExiste.js";
import { validarIdMongo } from "../middlewares/validarUsuarios.js";

const router = Router();

router.get("/", getPagos);
router.get("/:id", [validarIdMongo, validarCampos], getPagoUsuario);
router.get("/estado/:id", [validarIdMongo, validarCampos], getEstadoUsuario);


router.post(
  "/",
  [
    check("usuarioId", "El ID del usuario es obligatorio").isMongoId(),
    check("monto", "El monto debe ser un número positivo").isNumeric(),
    validarCampos,
  ],
  postNuevoPago
);

router.post('/enviar-factura', enviarFactura);

router.delete(
  "/:id", 
  [validarIdMongo, validarCampos, verificarPagoExiste], 
  deletePago
);


export default router;