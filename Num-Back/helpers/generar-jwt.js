import jwt from "jsonwebtoken"

export const generarJWT = (id) => {
  return new Promise(
    ((resolve, reject) => {
      const payload = { id };
      const secret = process.env.SECRETORPRIVATEKEY_LOCAL || process.env.SECRETORPRIVATEKEY;
      jwt.sign(
      payload,
      secret,
      {
        expiresIn: "4h",
      },        (err, token) => {
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

export default generarJWT