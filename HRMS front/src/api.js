import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const getJSON = async (url) => {
  const res = await api.get(url);
  return res.data;
};

export const postJSON = async (url, data) => {
  const res = await api.post(url, data);
  return res.data;
};

export const deleteReq = async (url) => {
  const res = await api.delete(url);
  return res.data;
};

export const loginUser = async (username, password) => {
  const res = await api.post("login/", { username, password });
  return res.data;
};

export default api;
