import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:2221" });

export const getMessages = (id) => api.get(`/api/user/message${id}`);

export const addMessage = (data) => api.post(`/api/user/message/`, data);
