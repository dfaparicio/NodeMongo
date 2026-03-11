import axiosInstance from "../plugins/pluginAxios.js";

// GET: Para obtener datos (ej: el perfil)
export const getData = async (url) => {
  const response = await axiosInstance.get(url);
  return response.data; 
};

// POST
export const postData = async (url, data) => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};

// PUT
export const putData = async (url, data) => {
  const response = await axiosInstance.put(url, data);
  return response.data;
};

// DELETE
export const deleteData = async (url) => {
  const response = await axiosInstance.delete(url);
  return response.data;
};

// Mercado Pago
export const crearPreferenciaPago = async (monto, titulo) => {
  return await postData("/mercadopago/create-preference", { monto, titulo });
};

export const verificarPago = async (paymentId) => {
  return await getData(`/mercadopago/verify-payment?payment_id=${paymentId}`);
};
