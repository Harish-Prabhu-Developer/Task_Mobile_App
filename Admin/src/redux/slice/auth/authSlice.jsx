import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { CONFIG } from "../../../Config";
import { toast } from "react-toastify";

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${CONFIG.BASE_URL}/taskapp/auth/login`,
        credentials
      );
      console.log("Login Response:", res.data);
      return res.data;
    } catch (error) {
      console.error("Login Error:", error);

      if (!error.response) {
        return rejectWithValue("Network Error: Server unreachable.");
      }

      return rejectWithValue(error.response.data?.msg || "Login failed");
    }
  }
);

// Async Thunk for OTP Verification
export const OTPVerify = createAsyncThunk(
  "auth/OTPVerify", // FIXED: Unique action type
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const URL = `${CONFIG.BASE_URL}/taskapp/auth/checksecret/${email}/${otp}`;
      console.log("OTP Verification URL:", URL);

      const res = await axios.get(URL);
      console.log("OTP Verification Response:", res.data);

      return res.data;
    } catch (error) {
      console.error("OTP Verification Error:", error);

      if (!error.response) {
        return rejectWithValue("Network Error: Server unreachable.");
      }

      return rejectWithValue(error.response.data?.msg || "OTP Verification failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    OnStatus: "",
    loading: false,
    error: null,
  },


  reducers: {
    setProfile(state) {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          state.user = jwtDecode(token);
        }
      } catch (error) {
        console.warn("Error decoding token:", error.message);
      }
    },
    logout(state) {
      state.user = null;
      state.OnStatus = "";
      state.loading = false;
      state.error = null;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      toast.success("User logged out successfully.");
      console.log("User logged out successfully.");
    },
  },

  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        console.log("Login request pending...");
        state.loading = true;
        state.error = null;
        state.OnStatus = "";
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login request fulfilled:", action.payload);

        state.loading = false;

        if (action.payload.msg === "OTP sent to the email") {
          state.OnStatus = action.payload.msg;
          return;
        }

        if (action.payload.msg === "Login success") {
          try {
            state.user = jwtDecode(action.payload.token);
            localStorage.setItem("isLoggedIn", JSON.stringify(true));
            localStorage.setItem("token", action.payload.token);
            state.OnStatus = action.payload.msg;
            toast.success("Login success");
          } catch (error) {
            console.error("Invalid token:", error);
            state.error = "Invalid token received.";
          }
          return;
        }

        if (action.payload.msg === "Invalid credentials") {
          state.error = "Invalid credentials";
          toast.error("Invalid credentials");
          return;
        }

        state.OnStatus = "Login failed";
        state.error = action.payload.msg || "Login failed";
      })

      .addCase(loginUser.rejected, (state, action) => {
        console.log("Login request rejected:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })

      // OTP Verification
      .addCase(OTPVerify.pending, (state) => {
        console.log("OTP verification pending...");
        state.loading = true;
        state.error = null;
        state.OnStatus = "";
      })

      .addCase(OTPVerify.fulfilled, (state, action) => {
        console.log("OTP verification fulfilled:", action.payload);
        state.loading = false;

        if (action.payload.msg === "Login successfully") {
          try {
            localStorage.setItem("isLoggedIn", JSON.stringify(true));
            localStorage.setItem("token", action.payload.token);
            state.OnStatus = "Login successful";
            toast.success("Login successful");
          } catch (error) {
            console.error("Invalid token after OTP verification:", error);
            state.error = "Invalid token received.";
          }
          return;
        }

        state.OnStatus = "OTP verification failed";
        state.error = action.payload.msg || "OTP verification failed";
      })

      .addCase(OTPVerify.rejected, (state, action) => {
        console.log("OTP verification rejected:", action.payload);
        state.loading = false;
        toast.error(action.payload);
        state.error = action.payload;
      });
  },
});

export const { logout,setProfile } = authSlice.actions;
export default authSlice.reducer;
