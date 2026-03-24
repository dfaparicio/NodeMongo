import { Router } from "express";
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

import {
  validarUsuarioId,
  validarIdLectura,
  validarEnviarEmailLectura
} from "../middlewares/validarLecturas.js";

import {
  verificarLecturaPrincipal,
} from "../middlewares/verificarLecturas.js";

const router = Router();

// GET ALL (ADMIN)
router.get("/", [validarJWT, esAdminRole], obtenerTodasLasLecturas);

// GENERAR PRINCIPAL
router.post("/principal/:usuarioId", [validarUsuarioId, verificarLecturaPrincipal], generarlecturaprincipal);

// GENERAR DIARIA
router.post("/diaria/:usuarioId", [validarUsuarioId], generarlecturadiaria);

// GET BY USUARIO
router.get("/usuario/:usuarioId", [validarUsuarioId], obtenerlecturasdeunusuario);

// CRON JOB / TRIGGER
router.get("/generar-diarias-sistema", triggerLecturasDiarias);

// GET BY ID
router.get("/:id", [validarIdLectura], obtenerlecturaporid);

// ENVIAR EMAIL
router.post("/enviar-email", [validarJWT, validarEnviarEmailLectura], enviarLecturaPorEmail);

export default router;
