// AssignTaskSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CONFIG } from "../../../Config";

// Set up headers with authentication
const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Fetch all Tasks
export const fetchtasks = createAsyncThunk(
    "tasks/getAll",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${CONFIG.BASE_URL}/taskapp/tasks/getall`, getHeaders());
        console.log("Tasks getall Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Tasks getall Error:", error);
        return rejectWithValue(error.response?.data?.msg || "Failed to fetch Tasks");
      }
    }
  );
  
  // Fetch a single task by Id
export const fetchtaskById = createAsyncThunk(
    "tasks/fetchById",
    async (taskId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${CONFIG.BASE_URL}/taskapp/tasks/get/${taskId}`, getHeaders());
        console.log("Task get Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Task get Error:", error);
        return rejectWithValue(error.response?.data?.msg || "Failed to fetch Task");
      }
    }
  );
  
  // Create a new task
export const newTask = createAsyncThunk(
    "tasks/create",
    async (taskData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${CONFIG.BASE_URL}/taskapp/tasks/add`, taskData, getHeaders());
        console.log("Tasks add Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Tasks add Error:", error);
        return rejectWithValue(error.response?.data?.msg || "Failed to create task");
      }
    }
  );
  
  // Update a task
export const updateTask = createAsyncThunk(
    "tasks/update",
    async ({ taskId, taskData }, { rejectWithValue }) => {
      console.log("tasks/update Id: ",taskId);
      console.log("tasks/update Data: ",taskData);
      try {
        const response = await axios.put(`${CONFIG.BASE_URL}/taskapp/tasks/update/${taskId}`, taskData, getHeaders());
        console.log("Tasks update Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Tasks update Error:", error);
        return rejectWithValue(error.response?.data?.msg || "Failed to update Task");
      }
    }
  );

  // Delete a task
export const deleteTask = createAsyncThunk(
    "tasks/delete",
    async (taskId, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${CONFIG.BASE_URL}/taskapp/tasks/delete/${taskId}`, getHeaders());
        console.log("Tasks delete Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Tasks delete Error:", error);
        return rejectWithValue(error.response?.data?.msg || "Failed to delete Task");
      }
    }
  );
  
  // Fetch all Notifications
  export const fetchNotifications = createAsyncThunk(
    "tasks/getNotification",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${CONFIG.BASE_URL}/taskapp/tasks/getnotification`, getHeaders());
        console.log("Tasks getNotification Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Tasks getNotification Error:", error);
        return rejectWithValue(error.response?.data?.msg || "Failed to fetch Notifications");
      }
    }
  );
  //Assign Task Slice
  const AssignTaskSlice = createSlice({
    name: "assignTask",
    initialState: {
      tasks: [],
      notifications: [],
      task:null,
      status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchtasks.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchtasks.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.tasks = action.payload;
        })
        .addCase(fetchtasks.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(fetchtaskById.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchtaskById.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.task = action.payload;
        })
        .addCase(fetchtaskById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
        .addCase(newTask.pending, (state) => {
          state.status = "loading";
        })
        .addCase(newTask.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.tasks.push(action.payload);
        })
        .addCase(newTask.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(updateTask.pending, (state) => {
          state.status = "loading";
        })
        .addCase(updateTask.fulfilled, (state, action) => {
          state.status = "succeeded";
          const updatedTask = action.payload;
          const index = state.tasks.findIndex((task) => task._id === updatedTask._id);
          if (index !== -1) {
            state.tasks[index] = updatedTask;
          }
        })
        .addCase(updateTask.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(deleteTask.pending, (state) => {
          state.status = "loading";
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
          state.status = "succeeded";
          const deletedTaskId = action.payload;
          state.tasks = state.tasks.filter((task) => task._id !== deletedTaskId);
        })
        .addCase(deleteTask.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(fetchNotifications.fulfilled,(state,action)=>{
          state.notifications=action.payload;
        });
    },
  });



  export default AssignTaskSlice.reducer;