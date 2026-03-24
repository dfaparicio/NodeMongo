import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import dotenv from "dotenv";
dotenv.config();

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '',
  options: { timeout: 5000 } 
});

const preference = new Preference(client);
const payment = new Payment(client);

export { client, preference, payment };
