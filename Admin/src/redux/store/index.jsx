import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/User/userSlice";
import authReducer from "../slice/auth/authSlice";
import projectReducer from "../slice/Project/projectSlice";
const store = configureStore({
  devTools: false,
  reducer: {
    auth: authReducer,
    user: userReducer,
    project: projectReducer,
  },
});

export default store;
