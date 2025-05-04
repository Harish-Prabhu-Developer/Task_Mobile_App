import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "@env";
import { ReportData, SummaryData } from "../../../Utils/OurInterFace";

interface analyticalState {
  summaryData: SummaryData | null;
  reportData: ReportData | null;
}

const getHeaders = async () => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchSummaryData = createAsyncThunk(
  "analytics/summary",
  async (_, { rejectWithValue }) => {
    try {
      const headers = await getHeaders();
      const response = await axios.get(`${API_URL}/taskapp/analytics/summary`, headers);
      return response.data;
    } catch (error: any) {
      console.error("Get Summary Api Error:", error);
      return rejectWithValue(error.response?.data?.msg || "Failed to fetch Summary");
    }
  }
);

export const fetchreportData = createAsyncThunk(
  "analytics/report",
  async (_, { rejectWithValue }) => {
    try {
      const headers = await getHeaders();
      const response = await axios.get(`${API_URL}/taskapp/analytics/report`, headers);
      return response.data;
    } catch (error: any) {
      console.error("Get report Api Error:", error);
      return rejectWithValue(error.response?.data?.msg || "Failed to fetch report");
    }
  }
);

const initialState: analyticalState = {
  summaryData: null,
  reportData: null,
};

const AnalyticalSlice = createSlice({
  name: "analytical",
  initialState,
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
