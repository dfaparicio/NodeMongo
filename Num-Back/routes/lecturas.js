import { Router } from "express";
import { check } from "express-validator";
import {
  generarlecturaprincipal,
  generarlecturadiaria,
  obtenerlecturasdeunusuario,
  obtenerlecturaporid,
  obtenerTodasLasLecturas,
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

router.get(
  "/:id",
  [
    check("id", "El ID es obligatorio").notEmpty(),
    check("id", "ID inválido de MongoDB").isMongoId(),
    validarCampos,
  ],
  obtenerlecturaporid,
);

export default router;
