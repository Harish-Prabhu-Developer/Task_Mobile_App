import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


export const loginUser =createAsyncThunk(
    "auth/loginUser",
    async (credentials,{rejectWithValue}) => {
        try {
            console.log("Login Request Data:", credentials);
            const res =await axios.post("http://localhost:3000/taskapp/auth/login",credentials );
            console.log("Login Response:", res.data); 
            return res.data;

        } catch (error) {
            if (error.message==="Network Error") {
              alert("Server Down ,Please Verify your Network");
              console.warn("Server Down");
              
            }
            return rejectWithValue(error.response.data || "Login Failed")

        }
    });


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    role: null,
    OnStatus: '',
    loading: false,
    error: null,
  },
  
  reducers: {
    OTPVerify(state, action){
      try {
        console.log("Func OTPVerify state:",action.payload.token);
        state.user = jwtDecode(action.payload.token);
        state.role = state.user.role;
        localStorage.setItem("isLoggedIn",JSON.stringify(true));
        localStorage.setItem("token", action.payload.token);
      } catch (error) {
        console.error("OTP Verify state Invalid token:", error);
        state.error = "OTP Verify state Invalid token received";
      }
  },

    logout(state) {
      state.user = null;
      state.role = null;
      state.OnStatus = "";
      state.loading = false;
      state.error = null;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      console.log("User logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      console.log("loginUser pending");
      localStorage.removeItem("isLoggedIn");
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("loginUser fulfilled");
      if (action.payload.msg === "OTP sent to the email") {
        console.log("OTP sent to the email");
        state.OnStatus = action.payload.msg;
      }else if (action.payload.msg === "Login success") {
        console.log("Login success");
        try {
          state.user = jwtDecode(action.payload.token);
          state.role = state.user.role;
          localStorage.setItem("isLoggedIn",JSON.stringify(true));
          localStorage.setItem("token", action.payload.token);
          na
        } catch (error) {
          console.error("Invalid token:", error.message);
          state.error = "Invalid token received";
        }

      }else if (action.payload.msg === "Invalid credentials") {
        console.log("Invalid credentials");
        state.OnStatus = action.payload.msg;
      }else{
        console.log("Login failed");
        state.OnStatus = action.payload.msg;
      }
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log("loginUser rejected");
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { OTPVerify,logout } = authSlice.actions;
export default authSlice.reducer;
