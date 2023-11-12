import { createSelector } from '@reduxjs/toolkit';

export const selectFavorite = state => state.favorite.items;
const selectFavoritFilter = state => state.filters.filtersFavorite;

export const getFilterFavorite = createSelector(
  [selectFavorite, selectFavoritFilter],
  (favoritsCars, favoritsCarsFilter) => {
    return favoritsCars.filter(adverts => {
      if (
        favoritsCarsFilter.selectedMake &&
        adverts.make !== favoritsCarsFilter.selectedMake
      ) {
        return false;
      }
      if (
        favoritsCarsFilter.selectedPrice &&
        parseInt(adverts.rentalPrice.slice(1), 10) >
          Number(favoritsCarsFilter.selectedPrice)
      ) {
        return false;
      }
      if (
        favoritsCarsFilter.minMileage &&
        adverts.mileage < Number(favoritsCarsFilter.minMileage)
      ) {
        return false;
      }
      if (
        favoritsCarsFilter.maxMileage &&
        adverts.mileage > Number(favoritsCarsFilter.maxMileage)
      ) {
        return false;
      }
      return true;
    });
  }
);

// const filterFavoritsCars = favoritsCars.filter(adverts => {
//   if (
//     favoritsCarsFilter.selectedMake &&
//     adverts.make !== favoritsCarsFilter.selectedMake
//   ) {
//     return false;
//   }
//   if (
//     favoritsCarsFilter.selectedPrice &&
//     parseInt(adverts.rentalPrice.slice(1), 10) >
//       Number(favoritsCarsFilter.selectedPrice)
//   ) {
//     return false;
//   }
//   if (
//     favoritsCarsFilter.minMileage &&
//     adverts.mileage < Number(favoritsCarsFilter.minMileage)
//   ) {
//     return false;
//   }
//   if (
//     favoritsCarsFilter.maxMileage &&
//     adverts.mileage > Number(favoritsCarsFilter.maxMileage)
//   ) {
//     return false;
//   }
//   return true;
// });
