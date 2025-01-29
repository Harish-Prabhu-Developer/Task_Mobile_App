import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/auth/userSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
