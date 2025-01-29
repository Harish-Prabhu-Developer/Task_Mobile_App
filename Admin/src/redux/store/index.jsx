import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/auth/userSlice";
const store = configureStore({
  devTools: false,
  reducer: {
    user: userReducer,
  },
});

export default store;
