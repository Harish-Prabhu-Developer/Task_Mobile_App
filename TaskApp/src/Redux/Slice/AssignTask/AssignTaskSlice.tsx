import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";
import { Activity, Task } from "../../../Utils/OurInterFace";

// Task Type (adjust fields based on your model)
interface Notification {
  _id: string;
  text: string;
  notiType: "alert"|"message";
  createdAt: string;
}

interface AssignTaskState {
  tasks: Task[];
  task: Task | null;
  notifications: Notification[],
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface updatedTaskactivities {
  
  activities:{
    type: string;
    activity?: string;
  }

}
// Async function to get headers with token
const getHeaders = async () => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch all tasks
export const fetchtasks = createAsyncThunk<Task[], void, { rejectValue: string }>(
  "tasks/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const headers = await getHeaders();

      const response = await axios.get(`https://task-app-kxpr.onrender.com/taskapp/tasks/getall`, headers);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || "Failed to fetch Tasks");
    }
  }
);

// Fetch single task by ID
export const fetchtaskById = createAsyncThunk<Task, string, { rejectValue: string }>(
  "tasks/fetchById",
  async (taskId, { rejectWithValue }) => {
    try {
      const headers = await getHeaders();
      const response = await axios.get(`https://task-app-kxpr.onrender.com/taskapp/tasks/get/${taskId}`, headers);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || "Failed to fetch Task");
    }
  }
);

// Create new task
export const newTask = createAsyncThunk<Task, Partial<Task>, { rejectValue: string }>(
  "tasks/create",
  async (taskData, { rejectWithValue }) => {
    try {
      const headers = await getHeaders();
      const response = await axios.post(`https://task-app-kxpr.onrender.com/taskapp/tasks/add`, taskData, headers);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || "Failed to create Task");
    }
  }
);

// Update task
export const updateTask = createAsyncThunk<Task, { taskId: string; taskData: updatedTaskactivities }, { rejectValue: string }>(
  "tasks/update",
  async ({ taskId, taskData }, { rejectWithValue }) => {
    try {
      const headers = await getHeaders();
      const response = await axios.put(`https://task-app-kxpr.onrender.com/taskapp/tasks/update/${taskId}`, taskData, headers);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || "Failed to update Task");
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk<string, string, { rejectValue: string }>(
  "tasks/delete",
  async (taskId, { rejectWithValue }) => {
    try {
      const headers = await getHeaders();
      await axios.delete(`https://task-app-kxpr.onrender.com/taskapp/tasks/delete/${taskId}`, headers);
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || "Failed to delete Task");
    }
  }
);

  // Fetch all Notifications
  export const fetchNotifications = createAsyncThunk(
    "tasks/getNotification",
    async (_, { rejectWithValue }) => {
      try {
        const headers = await getHeaders();
        const response = await axios.get(`https://task-app-kxpr.onrender.com/taskapp/tasks/getnotification`, headers);
        console.log("Tasks getNotification Response:", response.data);
        return response.data;
      } catch (error:any) {
        console.error("Tasks getNotification Error:", error);
        return rejectWithValue(error.response?.data?.msg || "Failed to fetch Notifications");
      }
    }
  );

// Initial state
const initialState: AssignTaskState = {
  tasks: [],
  task: null,
  notifications: [],
  status: "idle",
  error: null,
};

// Slice  
const AssignTaskSlice = createSlice({
  name: "assignTask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchtasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchtasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchtasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error fetching tasks";
      })

      // Fetch by ID
      .addCase(fetchtaskById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchtaskById.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = "succeeded";
        state.task = action.payload;
      })
      .addCase(fetchtaskById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error fetching task by ID";
      })

      // Create
      .addCase(newTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(newTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error creating task";
      })

      // Update
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = "succeeded";
        const updated = action.payload;
        const index = state.tasks.findIndex((task) => task._id === updated._id);
        if (index !== -1) {
          state.tasks[index] = updated;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error updating task";
      })

      // Delete
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "succeeded";
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error deleting task";
      })
      .addCase(fetchNotifications.fulfilled,(state,action)=>{
        state.notifications=action.payload;
      });
  },
});

export default AssignTaskSlice.reducer;
