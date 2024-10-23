import axios from "axios";

const API_URL = "http://localhost:5173/api/user/message";

export const getAlltexts = async (chatID) => {
  const response = await axios.get(`${API_URL}/${chatID}`);
  return response.data;
};
export const addMessage = async (data) => {
  
  const response = await axios.post(API_URL, data);

  return response.data;
};


