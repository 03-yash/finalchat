
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatService";
const initialState = {
  senderID: null,
  receiverID:null,
  chatID: null,
  receiver : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.senderID = action.payload.members[0];
        state.receiverID = action.payload.members[1];
        state.chatID = action.payload._id;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess= false;
        state.isError = true;
        state.message = action.payload;
        state.senderID = null;
        state.receiverID = null;
        state.chatID = null;
      }).addCase(receiverUser.fulfilled,(state,action)=>{
        state.receiver = action.payload
      });
  }, 
});
export default chatSlice.reducer;

export const createChat = createAsyncThunk(
  "CHAT_USER",
  async (IDS, thunkAPI) => {
    try {
    return await chatService.makeChat(IDS)
    
    } catch (error) {
      const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
    }
  }
);

export const receiverUser= createAsyncThunk("RECEIVER/USER" ,async(user)=>{
  return user
})



