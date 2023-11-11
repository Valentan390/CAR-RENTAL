import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { carsReducer } from './carsData/cardataSlice';
import favoriteReducer from './favorite/favoriteSlice';
import filtersReducer from './filters/filtersSlice';

// import { favoriteReducer } from './favorite/favoriteSlice';
// import { filterReducer } from './filter/filterSlice';

const favoritePersistConfig = {
  key: 'favorites',
  storage,
  whitelist: ['items'],
};

const persistedUserReducer = persistReducer(
  favoritePersistConfig,
  favoriteReducer
);

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    favorite: persistedUserReducer,
    filters: filtersReducer,
    // filter: filterReducer,
    // favorites: favoriteReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// import { configureStore } from '@reduxjs/toolkit';
// import { carsReducer } from './carsData/cardataSlice';

// export const store = configureStore({
//   reducer: {
//     cars: carsReducer,
//   },
// });
