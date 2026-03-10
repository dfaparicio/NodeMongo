import { Router } from "express";
import { check } from "express-validator";
import {
  generarlecturaprincipal,
  generarlecturadiaria,
  obtenerlecturasdeunusuario,
  obtenerlecturaporid,
  obtenerTodasLasLecturas,
  enviarLecturaPorEmail,
  triggerLecturasDiarias,
} from "../controllers/lecturas.js";
import validarJWT from "../middlewares/validar-jwt.js";
import { esAdminRole } from "../middlewares/validar-rol.js";

import { validarCampos } from "../middlewares/validarCampos.js";
import {
  verificarLecturaPrincipal,
} from "../middlewares/verificarLecturas.js";

const router = Router();

router.get("/", [validarJWT, esAdminRole], obtenerTodasLasLecturas);

router.post(
  "/principal/:usuarioId",
  [
    check("usuarioId", "El usuarioId es obligatorio").notEmpty(),
    check("usuarioId", "ID inválido de MongoDB").isMongoId(),
    validarCampos,
  ],
  verificarLecturaPrincipal,
  generarlecturaprincipal,
);

router.post(
  "/diaria/:usuarioId",
  [
    check("usuarioId", "El usuarioId es obligatorio").notEmpty(),
    check("usuarioId", "ID inválido de MongoDB").isMongoId(),
    validarCampos,
  ],
  generarlecturadiaria,
);

router.get(
  "/usuario/:usuarioId",
  [
    check("usuarioId", "El usuarioId es obligatorio").notEmpty(),
    check("usuarioId", "ID inválido de MongoDB").isMongoId(),
    validarCampos,
  ],
  obtenerlecturasdeunusuario,
);

// Ruta para despertar el servidor y generar lecturas (usada por cron-job.org)
router.get("/generar-diarias-sistema", triggerLecturasDiarias);

router.get(
  "/:id",
  [
    check("id", "El ID es obligatorio").notEmpty(),
    check("id", "ID inválido de MongoDB").isMongoId(),
    validarCampos,
  ],
  obtenerlecturaporid,
);

router.post(
  "/enviar-email",
  [
    validarJWT,
    check("email", "El email es obligatorio").isEmail(),
    check("lectura", "La lectura es obligatoria").notEmpty(),
    validarCampos,
  ],
  enviarLecturaPorEmail,
);

export default router;
