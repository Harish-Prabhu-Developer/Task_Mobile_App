import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/auth/userSlice";
import authReducer from "../slice/auth/authSlice";
import emailReducer from "../slice/auth/emailSlice";
const store = configureStore({
  devTools: false,
  reducer: {
    auth: authReducer,
    user: userReducer,
    email: emailReducer,
  },
});

export default store;
