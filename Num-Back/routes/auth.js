import { Router } from "express";
import { check } from "express-validator";
import { login, registro, verificarEmail, recuperarPassword, nuevoPassword } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarEmail } from "../helpers/usuarios.js";

const router = Router();

// REGISTRO PÚBLICO
router.post("/registro", [
    check('nombre', 'El nombre es obligatorio').not().isEmpty().isLength({ min: 3, max: 50 }),
    check('email', 'Debe ser un email válido').isEmail(),
    check('email').custom(validarEmail),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], registro);

// LOGIN
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