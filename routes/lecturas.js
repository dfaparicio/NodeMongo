import { Router } from "express";
import { check } from "express-validator";
import {
  postLecturaPrincipal,
  postLecturaDiaria,
  getlecturasusuario,
  getlecturaporid,
} from "../controllers/lecturascontrollers.js";

import { validarCampos } from "../middlewares/validarCampos.js";
import {
  verificarLectura,
  verificarLecturaPrincipal,
} from "../middlewares/verificarLecturas.js";

const router = Router();

router.post(
  "/api/lecturas/principal/:usuario_id",
  [
    check("usuario_id", "El usuario_id es obligatorio").notEmpty(),
    check("usuario_id", "El usuario_id debe ser un número").isInt(),
  ],
  verificarLectura,
  verificarLecturaPrincipal,
  validarCampos,
  postLecturaPrincipal,
);

router.post(
  "/api/lecturas/diaria/:usuario_id",
  [
    check("usuario_id", "El usuario_id es obligatorio").notEmpty(),
    check("usuario_id", "El usuario_id debe ser un número").isInt(),
  ],
  verificarLectura,
  validarCampos,
  postLecturaDiaria,
);

router.get(
  "/api/lecturas/usuario/:usuario_id",
  [
    check("usuario_id", "El usuario_id es obligatorio").notEmpty(),
    check("usuario_id", "El usuario_id debe ser un número").isInt(),
  ],
  validarCampos,
  getlecturasusuario,
);

router.get(
  "/api/lecturas/:id",
  [
    check("id", "El ID es obligatorio").notEmpty(),
    check("id", "ID inválido de MongoDB").isMongoId(),
  ],
  validarCampos,
  getlecturaporid,
);

export default router;
