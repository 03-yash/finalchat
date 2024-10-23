import axios from "axios";

const makeChat = async (IDs) => {
  
  const response = await axios.post('/api/user/chat', IDs);
  return response.data;
};


const chatService = {
  makeChat,
};

export default chatService;


