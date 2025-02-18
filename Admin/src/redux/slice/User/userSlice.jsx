import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CONFIG } from "../../../Config";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";


// Set up headers with authentication
const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
;

// Fetch all users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${CONFIG.BASE_URL}/taskapp/users/all`,getHeaders());
    console.log("getall users Api res :",res.data);
    return res.data;
  } catch (error) {
    console.error("getall users Api error :",error);
    return rejectWithValue(error.response?.data?.msg || "Failed to fetch projects");
  }
});

// Add a new user
export const addUser = createAsyncThunk("user/addUser", async (userData, { rejectWithValue }) => {
  try {
    console.log("Add User Data : ",userData);
    const res = await axios.post(`${CONFIG.BASE_URL}/taskapp/users/add`, userData,getHeaders());
    console.log("Add a new User Res :",res.data);
    return res.data;
  } catch (error) {
    console.error("Add Api error :",error.message);
    return rejectWithValue(error.response?.data?.msg || "Failed to fetch projects");
  }
});

// Update a user
export const editUser = createAsyncThunk("user/updateUser", async ({ id, data }, { rejectWithValue }) => {
  console.log("update id",id);
  console.log("update data",data);
  
  try {
    const res = await axios.put(`${CONFIG.BASE_URL}/taskapp/users/${id}`, data,getHeaders());
    console.log("Updated a User Res : ",res.data);
    return res.data;
  } catch (error) {
    console.error("Update Api error :",error);
    return rejectWithValue(error.response?.data?.msg || "Failed to fetch projects");
  }
});

// Delete a user
export const deleteUser = createAsyncThunk("user/deleteUser", async (id, { rejectWithValue }) => {
  try {
    const res = await axios.delete(`${CONFIG.BASE_URL}/taskapp/users/${id}`,getHeaders());
    console.log("Delete a User Res : ",res.data);
    return res.data;
  } catch (error) {
    console.error("Deleted Api Error:",error);
    return rejectWithValue(error.response?.data?.msg || "Failed to fetch projects");
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
          if (action.payload.users) {
            // Filter out the logged-in user from the users array
            state.users = action.payload.users.filter((user) => user._id !== decodedToken._id)||[];
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
        console.log("Add user action payload:", action.payload.user);
        state.users.push(action.payload.user);
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
        const index = state.users.findIndex((user) => user.id === action.payload.user._id);
        if (index !== -1) {
          state.users[index] = action.payload.user;
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
