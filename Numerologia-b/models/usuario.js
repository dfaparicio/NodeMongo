import mongoose from "mongoose";

const usuario = new mongoose.Schema({
    nombre:{type:String,required:true},
    edad:{type:Number},
    fechanacimiento:{type:Date, default:Date.now},
    email:{type:String,unique:true, required: true},
    password:{type:String, required: true},
    rol:{type:String, required:true, default:'USER_ROLE', enum:['ADMIN_ROLE', 'USER_ROLE', 'OTHER_ROLE']},
    estado:{type:Number,default:1}//0 inactivo   1 activo
});

export default mongoose.model("Usuario",usuario)