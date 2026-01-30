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
  verificarLectura,
  verificarLecturaPrincipal,
} from "../middlewares/verificarLecturas.js";

const router = Router();

router.post(
  "/principal/:usuario_id",
  [
    check("usuario_id", "El usuario_id es obligatorio").notEmpty(),
    check("usuario_id", "ID inválido de MongoDB").isMongoId(),
  ],
  verificarLectura,
  verificarLecturaPrincipal,
  validarCampos,
  generarlecturaprincipal,
);

router.post(
  "/diaria/:usuario_id",
  [
    check("usuario_id", "El usuario_id es obligatorio").notEmpty(),
    check("usuario_id", "ID inválido de MongoDB").isMongoId(),
  ],
  verificarLectura,
  validarCampos,
  generarlecturadiaria,
);

router.get(
  "/usuario/:usuario_id",
  [
    check("usuario_id", "El usuario_id es obligatorio").notEmpty(),
    check("usuario_id", "ID inválido de MongoDB").isMongoId(),
  ],
  validarCampos,
  obtenerlecturasdeunusuario,
);

router.get(
  "/:id",
  [
    check("id", "El ID es obligatorio").notEmpty(),
    check("id", "ID inválido de MongoDB").isMongoId(),
  ],
  validarCampos,
  obtenerlecturaporid,
);

export default router;
