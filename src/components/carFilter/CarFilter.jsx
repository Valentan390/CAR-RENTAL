import SelectBrand from 'components/select/SelectBrand';
import styles from './CarFilter.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters } from 'redux/filters/selectorsFilters';
import SelectPrice from 'components/select/SelectPrice';
import { resetFilters, setFilters } from 'redux/filters/filtersSlice';

const CarFilter = ({ onFilterChange }) => {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');

  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  useEffect(() => {
    setSelectedMake(filters.selectedMake);
    setSelectedPrice(filters.selectedPrice);
    setMinMileage(filters.minMileage);
    setMaxMileage(filters.maxMileage);
  }, [
    filters.maxMileage,
    filters.minMileage,
    filters.selectedMake,
    filters.selectedPrice,
  ]);

  const handleFormSubmit = event => {
    event.preventDefault();

    const filters = {
      selectedMake,
      selectedPrice,
      minMileage,
      maxMileage,
    };

    dispatch(setFilters(filters));
  };

  const clearFilters = e => {
    e.preventDefault();
    dispatch(resetFilters());
  };

  const isAnyFieldFilled =
    selectedMake || selectedPrice || minMileage || maxMileage;

  return (
    <div>
      <form onSubmit={handleFormSubmit} className={styles.filterForm}>
        <div className={styles.select_wrapper}>
          <label className={styles.label_title}>Car brand</label>
          <SelectBrand
            selectedMake={selectedMake}
            setSelectedMake={setSelectedMake}
          />
        </div>
        <div className={styles.select_wrapper}>
          <label className={styles.label_title}>Price/ 1 hour</label>
          <SelectPrice
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
          />
        </div>
        <div className={styles.select_wrapper}>
          <label className={styles.label_title}>Car mealege / km</label>

          <div>
            <div className={styles.input_wrapper}>
              <label className={styles.InputPl}>From</label>
              <input
                className={styles.left_input}
                type="number"
                value={minMileage}
                onChange={e => {
                  const value = e.target.value;
                  if (value === '' || parseInt(value, 10) >= 1) {
                    setMinMileage(value);
                  }
                }}
              />
            </div>
            <div className={styles.input_wrapper}>
              <label className={styles.InputPl}>To</label>
              <input
                className={styles.rigth_input}
                type="number"
                value={maxMileage}
                onChange={e => {
                  const value = e.target.value;
                  if (value === '' || parseInt(value, 10) >= 1) {
                    setMaxMileage(value);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`${
            isAnyFieldFilled ? styles.btn_Search : styles.disabledBtn
          }`}
          disabled={!isAnyFieldFilled}
        >
          Search
        </button>
        <button
          type="reset"
          onClick={clearFilters}
          className={`${
            isAnyFieldFilled ? styles.closeBtn : styles.disabledBtn
          }`}
          disabled={!isAnyFieldFilled}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default CarFilter;
