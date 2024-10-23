import { configureStore }  from "@reduxjs/toolkit";
import formData from "./user/formData";
import userSlice from "./user/userSlice";
import chatSlice from "./chat/chatSlice";
const store = configureStore({
    reducer:{
        formData:formData,
        user: userSlice,
        chat : chatSlice,
     

    }
})
export default store;