import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCars,
  fetchCarById,
  fetchCars,
  fetchFirstPage,
} from './cardataThunk';

const initialState = {
  cars: [],
  filterCars: [],
  allcars: [],

  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const handleFirstPageFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.cars = action.payload;
};
const handleFetchCarsFulfilled = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.cars = [...state.cars, ...action.payload];
};
const handleFetchCarsFulfilledAll = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.allcars = action.payload;
};

const handleFetchCarsFilter = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.filterCars = action.payload;
};

export const carsSlice = createSlice({
  name: 'cars',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(fetchFirstPage.pending, handlePending)
      .addCase(fetchFirstPage.fulfilled, handleFirstPageFulfilled)
      .addCase(fetchFirstPage.rejected, handleRejected)
      .addCase(fetchCars.pending, handlePending)
      .addCase(fetchCars.fulfilled, handleFetchCarsFulfilled)
      .addCase(fetchCars.rejected, handleRejected)
      .addCase(fetchCarById.pending, handlePending)
      .addCase(fetchCarById.fulfilled, handleFetchCarsFilter)
      .addCase(fetchCarById.rejected, handleRejected)
      .addCase(fetchAllCars.pending, handlePending)
      .addCase(fetchAllCars.fulfilled, handleFetchCarsFulfilledAll)
      .addCase(fetchAllCars.rejected, handleRejected),
});

export const carsReducer = carsSlice.reducer;
