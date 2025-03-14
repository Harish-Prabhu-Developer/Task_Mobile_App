// Analytical.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CONFIG } from "../../../Config";


// Set up headers with authentication
const getHeaders = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  
  // Fetch all Summaries
  export const fetchSummaryData = createAsyncThunk(
      "analytics/summary",
      async (_, { rejectWithValue }) => {
        try {
          const response = await axios.get(`${CONFIG.BASE_URL}/taskapp/analytics/summary`, getHeaders());
          console.log("Get Summary Api Response:", response.data);
          return response.data;
        } catch (error) {
          console.error("Get Summary Api Error:", error);
          return rejectWithValue(error.response?.data?.msg || "Failed to fetch Summary");
        }
      }
    );
  // Fetch all Summaries
  export const fetchreportData = createAsyncThunk(
    "analytics/report",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${CONFIG.BASE_URL}/taskapp/analytics/report`, getHeaders());
        console.log("Get report Api Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Get report Api Error:", error);
        return rejectWithValue(error.response?.data?.msg || "Failed to fetch report");
      }
    }
  );

const AnalyticalSlice = createSlice({
    name: "analytical",
    initialState: {
      summaryData: [],
      reportData:[],
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchSummaryData.fulfilled, (state, action) => {
          state.summaryData = action.payload;
        })
        .addCase(fetchreportData.fulfilled, (state, action) => {
          state.reportData = action.payload;
        });
    },
  });
  
  export default AnalyticalSlice.reducer;
  