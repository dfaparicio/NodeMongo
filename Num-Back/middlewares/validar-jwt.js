import jwt from "jsonwebtoken"
import Usuario from "../models/usuario.js"

const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

    // --- AGREGA ESTO: Validación inicial ---
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }
    // ---------------------------------------

    try {
        // Ahora sí es seguro verificar, porque sabemos que token tiene algo
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY); 
        
        // OJO: En tu modelo suele ser _id, no id. Si falla, revisa si es { id } o { id }
        const usuario = await Usuario.findById(id); 

        if (!usuario) {
            return res.status(401).json({ msg: 'Token no válido - usuario no existe en DB' });
        }

        // Verificar si el id tiene estado true
        if (!usuario.estado) { // Asumiendo que estado es booleano o 1/0
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