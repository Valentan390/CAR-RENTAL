import CarFilter from 'components/carFilter/CarFilter';
import CarsCards from 'components/carscards/CarsCards';
import React from 'react';

const Catalog = () => {
  return (
    <div>
      <CarFilter />
      <CarsCards />
    </div>
  );
};

export default Catalog;
