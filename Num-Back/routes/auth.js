import { Router } from "express";
import { login, registro, verificarEmail, recuperarPassword, nuevoPassword, renewToken } from "../controllers/auth.js";
import { validarRegistro, validarLogin, validarRecuperacion, validarNuevoPassword } from "../middlewares/validarRegistro.js";
import validarJWT from "../middlewares/validar-jwt.js";

const router = Router();

// REGLA: Obtener perfil actualizado
router.get("/renew", validarJWT, renewToken);

// REGISTRO PÚBLICO
router.post("/registro", validarRegistro, registro);

// LOGIN
router.post("/login", validarLogin, login);

// OTROS
router.get("/confirmar/:token", verificarEmail);
router.post("/recuperar-password", validarRecuperacion, recuperarPassword);
router.post("/nuevo-password/:token", validarNuevoPassword, nuevoPassword);

export default router;
