import { validationResult } from 'express-validator';

export const validarCampos = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("❌ Errores de validación:", JSON.stringify(errors.array(), null, 2));
        return res.status(400).json(errors);
    }
    next();
};
