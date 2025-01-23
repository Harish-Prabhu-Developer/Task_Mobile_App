import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:null,
        loading:false,
        token:null,
        role:null,
        error:null,
    },
    extraReducers:(builder)=>{
       
    }
});