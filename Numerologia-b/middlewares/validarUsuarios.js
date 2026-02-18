
import mongoose from "mongoose";
import Usuario from "../models/usuario.js";

export const validarIdMongo = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            msg: `El ID ${id} no es un ID válido de MongoDB`
        });
    }

    next();
};

export const validarUsuarioActivoMiddleware = async (req, res, next) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(404).json({
                msg: `El usuario con ID ${id} no existe`
            });
        }

        if (usuario.estado === 0) {
            return res.status(400).json({
                msg: `El usuario con ID ${id} está inactivo`
            });
        }

        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Error verificando el estado del usuario"
        });
    }
};
