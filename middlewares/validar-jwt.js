import jwt from "jsonwebtoken"
import Usuario from "../models/usuario.js"

const validarJWT = async (req,res,next)=>{
    try {
        const token = req.header("x-token")
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(401).json({ msg: 'Token no válido - usuario no existe' });
        }
        if (usuario.estado === 0) {
            return res.status(401).json({ msg: 'Token no válido - usuario inactivo' });
        }
        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            error:"Token no valido"
        })
    }
}

export default validarJWT