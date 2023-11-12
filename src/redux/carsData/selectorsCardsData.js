import { createSelector } from '@reduxjs/toolkit';

export const selectCars = state => state.cars.cars;
export const selectAllCars = state => state.cars.allcars;
export const selectCarsModal = state => state.cars.filterCars;
export const selectCarsFilter = state => state.filters.filters;
export const selectIsLoading = state => state.cars.isLoading;

export const getFilterContacts = createSelector(
  [selectAllCars, selectCarsFilter],
  (allCars, filters) => {
    return allCars.filter(adverts => {
      if (filters.selectedMake && adverts.make !== filters.selectedMake) {
        return false;
      }
      if (
        filters.selectedPrice &&
        parseInt(adverts.rentalPrice.slice(1), 10) >
          Number(filters.selectedPrice)
      ) {
        return false;
      }
      if (filters.minMileage && adverts.mileage < Number(filters.minMileage)) {
        return false;
      }
      if (filters.maxMileage && adverts.mileage > Number(filters.maxMileage)) {
        return false;
      }
      return true;
    });
  }
);
