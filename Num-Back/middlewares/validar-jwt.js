import jwt from "jsonwebtoken"
import Usuario from "../models/usuario.js"

const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }

    try {
        const secret = process.env.SECRETORPRIVATEKEY_LOCAL || process.env.SECRETORPRIVATEKEY;
        const { id } = jwt.verify(token, secret);

        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return res.status(401).json({ msg: 'Token no válido - usuario no existe en DB' });
        }

        /* 
        // Eliminamos esta validación porque el estado 0 ahora significa "No ha pagado aún" 
        // y queremos que el usuario pueda entrar al dashboard básico.
        if (!usuario.estado && usuario.estado !== 0) { 
             return res.status(401).json({ msg: 'Token no válido - usuario inactivo' });
        }
        */

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        })
    }
}

export default validarJWT