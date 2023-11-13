import CarFilterFavorits from 'components/carFilterFavorits/CarFilterFavorits';
import FavoritsCarsCards from 'components/favoritsCarsCards/FavoritsCarsCards';
import React from 'react';
const Favourites = () => {
  return (
    <>
      <CarFilterFavorits />
      <FavoritsCarsCards />
    </>
  );
};

export default Favourites;
