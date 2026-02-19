import axiosInstance from "../plugins/pluginAxios.js";

export const postData = async (url, data) => {
  const response = await axiosInstance.post(url, data);
  return response;
};
