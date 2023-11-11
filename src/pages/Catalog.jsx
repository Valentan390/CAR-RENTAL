import CarFilter from 'components/carFilter/CarFilter';
import CarsCards from 'components/carscards/CarsCards';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from 'redux/filters/filtersSlice';

const Catalog = () => {
  const dispatch = useDispatch();

  const handleFilterChange = filters => {
    dispatch(setFilters(filters));
  };
  return (
    <div>
      <CarFilter onFilterChange={handleFilterChange} />
      <CarsCards />
    </div>
  );
};

export default Catalog;
