import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/User/userSlice";
import authReducer from "../slice/auth/authSlice";
import projectReducer from "../slice/Project/projectSlice";
import AssignTaskReducer from "../slice/AssignTask/AssignTaskSlice";
import AnalyticalReducer from "../slice/Analytical/Analytical";
const store = configureStore({
  devTools: false,
  reducer: {
    auth: authReducer,
    user: userReducer,
    project: projectReducer,
    assigntasks: AssignTaskReducer,
    analytical: AnalyticalReducer,
  },
});

export default store;
