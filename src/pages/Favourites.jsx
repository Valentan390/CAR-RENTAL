import CarFilterFavorits from 'components/carFilterFavorits/CarFilterFavorits';
import FavoritsCarsCards from 'components/favoritsCarsCards/FavoritsCarsCards';
import React from 'react';
const Favourites = () => {
  return (
    <div>
      <CarFilterFavorits />
      <FavoritsCarsCards />
    </div>
  );
};

export default Favourites;
