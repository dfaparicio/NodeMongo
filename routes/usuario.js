import { Router } from "express";
import { check } from "express-validator";

import {
  deleteUsuario,
  getUsuario,
  getUsuarioEmail,
  postUsuario,
  putUsuario,
  putUsuarioActivar,
  putUsuarioInactivar,
} from "../controllers/usuario.js";

import { validarCampos } from "../middlewares/validarCampos.js";
import { validarUsuarioActivoMiddleware } from "../middlewares/validarUsuarios.js";

import {
  validarEmail,
  validarExisteUsuario,
} from "../helpers/usuarios.js";

const router = Router();

// ========================
//        GET
// ========================
router.get("/", getUsuario);

router.get(
  "/email",
  [
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "Formato de email no válido").isEmail(),
    validarCampos,
  ],
  getUsuarioEmail
);

// ========================
//        POST
// ========================
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio")
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 50 }),

    check("edad", "La edad debe ser numérica")
      .optional()
      .isNumeric(),

    check("fechanacimiento", "La fecha no es válida")
      .optional()
      .isISO8601()
      .toDate(),

    check("email", "Debe ser un email válido").isEmail(),
    check("email").custom(validarEmail),

    validarCampos,
  ],
  postUsuario
);

// ========================
//        PUT
// ========================
router.put(
  "/:id",
  [
    check("id", "ID inválido").isMongoId(),
    check("id").custom(validarExisteUsuario),

    check("nombre", "El nombre es obligatorio").not().isEmpty(),

    validarCampos,
    validarUsuarioActivoMiddleware,  // ← CORRECTO
  ],
  putUsuario
);

router.put(
  "/activar/:id",
  [
    check("id", "ID inválido").isMongoId(),
    check("id").custom(validarExisteUsuario),
    validarCampos,
  ],
  putUsuarioActivar
);

router.put(
  "/inactivar/:id",
  [
    check("id", "ID inválido").isMongoId(),
    check("id").custom(validarExisteUsuario),
    validarCampos,
  ],
  putUsuarioInactivar
);

// ========================
//        DELETE
// ========================
router.delete(
  "/:id",
  [
    check("id", "ID inválido").isMongoId(),
    check("id").custom(validarExisteUsuario),
    validarCampos,
  ],
  deleteUsuario
);

export default router;
