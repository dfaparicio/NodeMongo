import { Router } from "express";
import { check } from "express-validator";
import { login, verificarEmail, recuperarPassword, nuevoPassword } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = Router();

router.post("/login", [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.get("/confirmar/:token", verificarEmail);
router.post("/recuperar-password", [
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos
], recuperarPassword);
router.post("/nuevo-password/:token", [
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], nuevoPassword);

export default router;