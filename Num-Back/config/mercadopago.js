import mercadopago from "mercadopago";
import dotenv from "dotenv";
dotenv.config();

const configureMercadoPago = () => {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    console.error("MERCADOPAGO_ACCESS_TOKEN no definido");
  }
  mercadopago.configure({ access_token: accessToken });
  return mercadopago;
};

export { configureMercadoPago, mercadopago };
