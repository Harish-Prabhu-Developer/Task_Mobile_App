// projectSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CONFIG } from "../../../Config";

// Set up headers with authentication
const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Fetch all projects
export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${CONFIG.BASE_URL}/taskapp/projects/getall`, getHeaders());
      console.log("Projects getall Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Projects getall Error:", error);
      return rejectWithValue(error.response?.data?.msg || "Failed to fetch projects");
    }
  }
);

// Fetch a single project
export const fetchProject = createAsyncThunk(
  "projects/fetchById",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${CONFIG.BASE_URL}/taskapp/projects/get/${projectId}`, getHeaders());
      console.log("Project get Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Project get Error:", error);
      return rejectWithValue(error.response?.data?.msg || "Failed to fetch project");
    }
  }
);

// Create a new project
export const createProject = createAsyncThunk(
  "projects/create",
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${CONFIG.BASE_URL}/taskapp/projects/add`, projectData, getHeaders());
      console.log("Projects add Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Projects add Error:", error);
      return rejectWithValue(error.response?.data?.msg || "Failed to create project");
    }
  }
);

// Update a project
export const updateProject = createAsyncThunk(
  "projects/update",
  async ({ projectId, projectData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${CONFIG.BASE_URL}/taskapp/projects/update/${projectId}`, projectData, getHeaders());
      console.log("Projects update Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Projects update Error:", error);
      return rejectWithValue(error.response?.data?.msg || "Failed to update project");
    }
  }
);

// Delete a project
export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${CONFIG.BASE_URL}/taskapp/projects/delete/${projectId}`, getHeaders());
      console.log("Projects delete Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Projects delete Error:", error);
      return rejectWithValue(error.response?.data?.msg || "Failed to delete project");
    }
  }
);

// Project Slice
const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    project: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Projects
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch Single Project
      .addCase(fetchProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.project = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Create Project
      .addCase(createProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.project) {
          state.projects = [...state.projects, action.payload.project];
        }
      })
      .addCase(createProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update Project
      .addCase(updateProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.projects.findIndex((project) => project._id === action.payload.project._id);
        if (index !== -1) {
          state.projects[index] = action.payload.project;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete Project
      .addCase(deleteProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projects = state.projects.filter((project) => project._id !== action.meta.arg);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
