import mongoose from "mongoose";
import Usuario from "../models/usuario.js";

const generarJWT = (id) => {
  return new Promise(
    ((resolve, reject) => {
      const payload = { id };
      jmt.sign(
        payload,
        process.env.SECRETORPRIVATEKEY,
        {
          expiresIn: "4h",
        },
        (err, token) => {
          if (err) {
            console.log(err);
            reject("No se pudo generar el token");
          } else {
            resolve(token);
          }
        },
      );
    }),
  );
};
