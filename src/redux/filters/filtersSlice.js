import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: ' filters',
  initialState: {
    filters: {
      selectedMake: '',
      selectedPrice: '',
      minMileage: '',
      maxMileage: '',
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    resetFilters: state => {
      state.filters.selectedMake = '';
      state.filters.selectedPrice = '';
      state.filters.minMileage = '';
      state.filters.maxMileage = '';
    },
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
