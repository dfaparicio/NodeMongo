import { Router } from "express";
import { check } from "express-validator";
import {
  generarlecturaprincipal,
  generarlecturadiaria,
  obtenerlecturasdeunusuario,
  obtenerlecturaporid,
} from "../controllers/lecturas.js";

import { validarCampos } from "../middlewares/validarCampos.js";
import {
  verificarLecturaPrincipal,
} from "../middlewares/verificarLecturas.js";

const router = Router();

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
  "/:usuarioId",
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
