import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Slice/Auth/authSlice";
import assignTaskSlice from "../Slice/AssignTask/AssignTaskSlice";
import AnalyticalSlice from "../Slice/Analyticals/AnalyticalSlice";
const store = configureStore({
    reducer: {
        auth: authSlice,
        assignTask: assignTaskSlice,
        analytics: AnalyticalSlice,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;