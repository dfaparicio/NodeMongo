import Usuario from "../models/usuario.js"
import bcrypt  from "bcryptjs"
import generarJWT from "../helpers/generar-jwt"

const login = async (req,res)=>{
    const {email,password} = req.body
    try {
        const usuario = await Usuario.findOne({email})
        if(!usuario) {
            return res.status(401).json({
                error:"Usuario no encontrado"
            })
        }
        const validPassword = bcrypt.compareSync(password,usuario.password)
        if(!validPassword) {
            return res.status(401).json({
                error:"Contraseña incorrecta"
            })
        }
        const token = generarJWT(usuario.id)
        res.json({
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:"Error al iniciar sesion"
        })
    }
}

export default login
