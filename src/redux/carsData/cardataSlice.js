import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllCars,
  fetchCarById,
  fetchCars,
  fetchFirstPage,
} from './cardataThunk';
// import {
//   fetchAllCarsForFilter,
//   fetchCars,
//   fetchFirstPage,
// } from './carsOperations';

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

// import { createSlice } from '@reduxjs/toolkit';
// import { fetchCarsdata } from './cardataThunk';

// const carsdataInitialState = {
//   cars: {
//     items: [],
//     isLoading: false,
//     error: null,
//   },
//   filter: '',
// };

// const carsSlice = createSlice({
//   name: 'cars',
//   initialState: carsdataInitialState,
//   reducers: {
//     filterContacts: (state, action) => {
//       state.filter = action.payload;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchCarsdata.pending, state => {
//         state.cars.isLoading = true;
//       })
//       .addCase(fetchCarsdata.fulfilled, (state, { payload }) => {
//         state.cars.isLoading = false;
//         // state.cars.items = [...state.cars.items, ...payload];
//         state.cars.items.push(...payload);
//         // state.cars.items = payload;
//         state.cars.error = null;
//       })
//       .addCase(fetchCarsdata.rejected, (state, { payload }) => {
//         state.cars.error = payload;
//         state.cars.isLoading = false;
//       });
//   .addCase(addContact.pending, state => {
//     state.contacts.isLoading = true;
//   })
//   .addCase(addContact.fulfilled, (state, { payload }) => {
//     state.contacts.isLoading = false;
//     state.contacts.error = null;
//     state.contacts.items.push(payload);
//   })
//   .addCase(addContact.rejected, (state, { payload }) => {
//     state.contacts.error = payload;
//     state.contacts.isLoading = false;
//   })
//   .addCase(deleteContact.pending, state => {
//     state.contacts.isLoading = true;
//   })
//   .addCase(deleteContact.fulfilled, (state, { payload }) => {
//     state.contacts.isLoading = false;
//     state.contacts.error = null;
//     state.contacts.items = state.contacts.items.filter(
//       ({ id }) => id !== payload.id
//     );
//   })
//   .addCase(deleteContact.rejected, (state, { payload }) => {
//     state.contacts.error = payload;
//     state.contacts.isLoading = false;
//   });
//   },
// });

// export const { filterContacts } = carsSlice.actions;
// export const carsReducer = carsSlice.reducer;
