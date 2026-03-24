import { Router } from "express";
import {
  deleteUsuario,
  getUsuario,
  getUsuarioEmail,
  postUsuario,
  putUsuario,
  putUsuarioActivar,
  putUsuarioInactivar,
  cambiarPassword,
} from "../controllers/usuario.js";

import {
  validarGetUsuarioEmail,
  validarCambiarPassword,
  validarPostUsuario,
  validarPutUsuario,
  validarIdUsuario
} from "../middlewares/validarUsuario.js";

import validarJWT from "../middlewares/validar-jwt.js";
import { esAdminRole } from "../middlewares/validar-rol.js";

const router = Router();

// GET ALL
router.get("/", [validarJWT, esAdminRole], getUsuario);

// GET BY EMAIL
router.get("/email", [validarJWT, validarGetUsuarioEmail], getUsuarioEmail);

// CHANGE PASSWORD
router.put("/password/:id", [validarJWT, validarCambiarPassword], cambiarPassword);

// CREATE USUARIO (ADMIN)
router.post("/", [validarJWT, esAdminRole, validarPostUsuario], postUsuario);

// UPDATE USUARIO
router.put("/:id", [validarJWT, validarPutUsuario], putUsuario);

// ACTIVATE USUARIO (ADMIN)
router.put("/activar/:id", [validarJWT, esAdminRole, validarIdUsuario], putUsuarioActivar);

// INACTIVATE USUARIO (ADMIN)
router.put("/inactivar/:id", [validarJWT, esAdminRole, validarIdUsuario], putUsuarioInactivar);

// DELETE USUARIO (ADMIN)
router.delete("/:id", [validarJWT, esAdminRole, validarIdUsuario], deleteUsuario);

export default router;
