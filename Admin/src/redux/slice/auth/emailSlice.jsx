import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
    name: "email",
    initialState: {
        email: "",
    },
    reducers: {
        setemail: (state, action) => {
            state.email = action.payload;
        },
    },
});

export const { setemail } = emailSlice.actions;
export default emailSlice.reducer;