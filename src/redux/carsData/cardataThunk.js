import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// https://652be498d0d1df5273eeddde.mockapi.io/cardata?page=1&limit=12

axios.defaults.baseURL = 'https://652be498d0d1df5273eeddde.mockapi.io/';

export const fetchFirstPage = createAsyncThunk(
  'cardata/fetchFirst',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/cardata?page=1&limit=12`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const fetchCars = createAsyncThunk(
  'cardata/fetchAll',
  async (page, thunkAPI) => {
    try {
      const response = await axios.get(`/cardata?page=${page}&limit=12`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  'cardata/fetchOne',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/cardata?id=${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchAllCars = createAsyncThunk(
  'cardata/fetchForFilter',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/cardata');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// export const fetchCarsdata = createAsyncThunk(
//   'carddata/fetchAll',
//   async (page, thunkAPI) => {
//     try {
//       const response = await getCarDataService(page);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );
