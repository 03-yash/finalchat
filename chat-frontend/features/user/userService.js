import axios from "axios";
const API_URL = "/api/user";
const createUser = async (formData) => {
  console.log(formData);
  const response = await axios.post(API_URL, formData);
  localStorage.setItem("Chatuser", JSON.stringify(response.data));
  return response.data;
};

const getUser = async (formData) => {
  const response = await axios.post("/api/user/login", formData);
  localStorage.setItem("Chatuser", JSON.stringify(response.data));
  return response.data;
};
const getAllusers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
const userService = {
  createUser,
  getUser,
  getAllusers,
};

export default userService;
