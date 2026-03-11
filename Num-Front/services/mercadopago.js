import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const crearPreferenciaPago = async (monto, titulo) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/api/mercadopago/create-preference`,
    { monto, titulo },
    { headers: { "x-token": token } },
  );
  return response.data;
};
