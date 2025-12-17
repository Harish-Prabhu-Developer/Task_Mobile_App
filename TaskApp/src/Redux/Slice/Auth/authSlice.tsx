import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

// Define user type based on your JWT structure
interface User {
  id: string;
  email: string;
  role: string;
  // Add more fields as per your token
}

interface AuthState {
  user: User | null;
  OnStatus: string;
  loading: boolean;
  error: string | null;
}

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `https://task-app-kxpr.onrender.com/taskapp/auth/login`,
        credentials
      );
      console.log("Login Response:", res.data);
      return res.data;
    } catch (error : any) {
      console.error("Login Error:", error);

      if (!error.response) {
        return rejectWithValue("Network Error: Server unreachable.");
      }

      return rejectWithValue(error.response.data?.msg || "Login failed");
    }
  }
);

// Async Thunk for OTP Verification
export const OTPVerify = createAsyncThunk<
  any,
  { email: string; otp: string },
  { rejectValue: string }
>("auth/OTPVerify", async ({ email, otp }, { rejectWithValue }) => {
  try {
    const URL = `https://task-app-kxpr.onrender.com/taskapp/auth/checksecret/${email}/${otp}`;
    console.log("OTP Verification URL:", URL);
    const res = await axios.get(URL);
    console.log("OTP Verification Response:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("OTP Verification Error:", error);
    if (!error.response) {
      return rejectWithValue("Network Error: Server unreachable.");
    }
    return rejectWithValue(error.response.data?.msg || "OTP Verification failed");
  }
});

const initialState: AuthState = {
  user: null,
  OnStatus: "",
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProfile(state) {
      AsyncStorage.getItem("token").then((token) => {
        if (token) {
          try {
            state.user = jwtDecode<User>(token);
          } catch (error: any) {
            console.warn("Error decoding token:", error.message);
          }
        }
      });
    },
    logout(state) {
      state.user = null;
      state.OnStatus = "";
      state.loading = false;
      state.error = null;
      AsyncStorage.multiRemove(["isLoggedIn", "token"]);
      console.log("User logged out successfully.");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.OnStatus = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.msg === "OTP sent to the email") {
          state.OnStatus = action.payload.msg;
        } else if (action.payload.msg === "Login success") {
          try {
            state.user = jwtDecode<any>(action.payload.token);
            AsyncStorage.setItem("isLoggedIn", "true");
            AsyncStorage.setItem("token", action.payload.token);
            state.OnStatus = action.payload.msg;
          } catch (error: any) {
            console.error("Invalid token:", error);
            state.error = "Invalid token received.";
          }
        } else if (action.payload.msg === "Invalid credentials") {
          state.error = "Invalid credentials";
        } else {
          state.OnStatus = "Login failed";
          state.error = action.payload.msg || "Login failed";
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string" ? action.payload : "Login failed";
        
      })

      // OTP
      .addCase(OTPVerify.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.OnStatus = "";
      })
      .addCase(OTPVerify.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.msg === "Login successfully") {
          try {
            AsyncStorage.setItem("isLoggedIn", "true");
            AsyncStorage.setItem("token", action.payload.token);
            state.OnStatus = "Login successful";
          } catch (error: any) {
            console.error("Invalid token after OTP verification:", error);
            state.error = "Invalid token received.";
          }
        } else {
          state.OnStatus = "OTP verification failed";
          state.error = action.payload.msg || "OTP verification failed";
        }
      })
      .addCase(OTPVerify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP Verification failed";
      });
  },
});

export const { setProfile, logout } = authSlice.actions;
export default authSlice.reducer;
