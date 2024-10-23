import { createSlice } from "@reduxjs/toolkit";
import noImage from "../../src/assets/noImage.png";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
  pImage: "",
};

const formSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    updateFormData(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetForm:(state)=>{
      state.name= "";
      state.email= "";
      state.password= "";
      state.password2= "";
     state.pImage = "";
    }
  },
  extraReducers: (builder) => {},
});
export const { updateFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;
