import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CONFIG } from "../../../Config";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

// Helper function for API requests
const apiCall = async (method, url, data = null) => {
  try {
    const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
    const response = await axios({ method, url, data, headers });
    console.log("API Response:", response.data.message);
    return response.data;
  } catch (error) {
    toast.error("Something went wrong. Please try again.");
    console.error("API Error:", error.data);
    throw error.response?.data?.message || "Something went wrong. Please try again.";
  }
};

// Fetch all users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    return await apiCall("get", `${CONFIG.BASE_URL}/taskapp/users/all`);
  } catch (error) {
    return rejectWithValue(error);
  }
});

// Add a new user
export const addUser = createAsyncThunk("user/addUser", async (userData, { rejectWithValue }) => {
  try {
    console.log("AddData : ",userData);
    
    return await apiCall("post", `${CONFIG.BASE_URL}/taskapp/users/add`, userData);
  } catch (error) {
    console.error("Add Api:",error.message);
    return rejectWithValue(error);
  }
});

// Update a user
export const editUser = createAsyncThunk("user/updateUser", async ({ id, data }, { rejectWithValue }) => {
  console.log("update id",id);
  console.log("update data",data);
  
  try {
    return await apiCall("put", `${CONFIG.BASE_URL}/taskapp/users/${id}`, data);
  } catch (error) {
    return rejectWithValue(error);
  }
});

// Delete a user
export const deleteUser = createAsyncThunk("user/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await apiCall("delete", `${CONFIG.BASE_URL}/taskapp/users/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Decode JWT token to get the logged-in user's ID
        try {
          const token = localStorage.getItem("token");
          
          if (!token) {

            console.error("No token found in localStorage");
            return;
          }
          const decodedToken = jwtDecode(token);
          console.log("Decoded Token Data:", decodedToken);
          if (action.payload) {
            // Filter out the logged-in user from the users array
            state.users = action.payload.filter((user) => user._id !== decodedToken._id)||[];
          }

          console.log("Filtered Users:", state.users);
        } catch (error) {
          console.error("Error decoding JWT token:", error);
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add User
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Edit User
      .addCase(editUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
