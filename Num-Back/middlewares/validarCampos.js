import { validationResult } from 'express-validator';

export const validarCampos = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg).join(', ');
        console.log("❌ Errores de validación:", errorMessages);
        return res.status(400).json({ error: errorMessages });
    }
    next();
};
