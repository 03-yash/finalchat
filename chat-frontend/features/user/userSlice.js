import userService from "./userService";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userPresent = JSON.parse(localStorage.getItem("Chatuser"));
const initialState = {
  user: userPresent ? userPresent : null,
  users: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(signoutUser.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = false;
      })
      .addCase(singinUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(singinUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(singinUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(allUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.users = null;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;

export const signupUser = createAsyncThunk(
  "SINGUP/REGISTER",
  async (formData, thunkAPI) => {
    try {
      return await userService.createUser(formData);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signoutUser = createAsyncThunk("SIGNOUT/LOGOUT", async () => {
  localStorage.removeItem("Chatuser");
});

export const singinUser = createAsyncThunk(
  "SIGNIN/LOGIN",
  async (formData, thunkAPI) => {
    try {
      return await userService.getUser(formData);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allUsers = createAsyncThunk("ALLUSER/GETALL", async (_,thunkAPI) => {
  try {
    return await userService.getAllusers();
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});
