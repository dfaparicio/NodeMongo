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
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY); 
        
        const usuario = await Usuario.findById(id); 

        if (!usuario) {
            return res.status(401).json({ msg: 'Token no válido - usuario no existe en DB' });
        }

        if (!usuario.estado) { 
             return res.status(401).json({ msg: 'Token no válido - usuario inactivo' });
        }
        
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