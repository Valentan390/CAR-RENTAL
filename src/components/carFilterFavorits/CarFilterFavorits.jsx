import styles from '../carFilter/CarFilter.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFiltersFavorite } from 'redux/filters/selectorsFilters';
import SelectPrice from 'components/select/SelectPrice';
import {
  resetFiltersFavorite,
  setFiltersFavorite,
} from 'redux/filters/filtersSlice';
import {
  InputDiv,
  InputPl,
  InputLeft,
  InputRight,
} from '../carFilter/CarFilter.styled';
import SelectBrandFavorits from 'components/select/SelectBrandFavorits';

const CarFilterFavorits = () => {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');

  const dispatch = useDispatch();
  const filtersFavorite = useSelector(selectFiltersFavorite);

  useEffect(() => {
    setSelectedMake(filtersFavorite.selectedMake);
    setSelectedPrice(filtersFavorite.selectedPrice);
    setMinMileage(filtersFavorite.minMileage);
    setMaxMileage(filtersFavorite.maxMileage);
  }, [
    filtersFavorite.maxMileage,
    filtersFavorite.minMileage,
    filtersFavorite.selectedMake,
    filtersFavorite.selectedPrice,
  ]);

  const handleFormSubmit = event => {
    event.preventDefault();

    const filtersFavorite = {
      selectedMake,
      selectedPrice,
      minMileage,
      maxMileage,
    };

    dispatch(setFiltersFavorite(filtersFavorite));
  };

  const clearFilters = e => {
    e.preventDefault();
    dispatch(resetFiltersFavorite());
  };

  const isAnyFieldFilled =
    selectedMake || selectedPrice || minMileage || maxMileage;

  return (
    <div>
      <form onSubmit={handleFormSubmit} className={styles.filterForm}>
        <div className={styles.select_wrapper}>
          <label className={styles.label_title}>Car brand</label>
          <SelectBrandFavorits
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
            <InputDiv>
              <InputPl>From</InputPl>
              <InputLeft
                type="number"
                value={minMileage}
                onChange={e => {
                  const value = e.target.value;
                  if (value === '' || parseInt(value, 10) >= 1) {
                    setMinMileage(value);
                  }
                }}
              />
            </InputDiv>
            <InputDiv>
              <InputPl>To</InputPl>
              <InputRight
                type="number"
                value={maxMileage}
                onChange={e => {
                  const value = e.target.value;
                  if (value === '' || parseInt(value, 10) >= 1) {
                    setMaxMileage(value);
                  }
                }}
              />
            </InputDiv>
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

export default CarFilterFavorits;
