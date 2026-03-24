import axiosInstance from "../plugins/pluginAxios.js";

export const crearPreferenciaPago = async (monto, titulo) => {
  const response = await axiosInstance.post(
    "/mercadopago/create-preference",
    { monto, titulo }
  );
  return response.data;
};

export const verificarPago = async (paymentId) => {
  const response = await axiosInstance.get(
    `/mercadopago/verify-payment?payment_id=${paymentId}`
  );
  return response.data;
};

export const consultarEstadoPago = async (preferenceId) => {
  const response = await axiosInstance.get(
    `/mercadopago/check-status?preference_id=${preferenceId}`
  );
  return response.data;
};
