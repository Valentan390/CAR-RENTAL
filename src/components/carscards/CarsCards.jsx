import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllCars,
  fetchCars,
  fetchFirstPage,
} from 'redux/carsData/cardataThunk';
import styles from './CarsCards.module.css';
import {
  getFilterContacts,
  selectCars,
  selectIsLoading,
} from 'redux/carsData/selectorsCardsData';
import { selectFilters } from 'redux/filters/selectorsFilters';
import LoaderSpiner from 'components/loaderSpiner/LoaderSpiner';
import CarItem from 'components/carItem/CarItem';

const CarsCards = () => {
  const [page, setPage] = useState(2);
  const [showButton, setShowButton] = useState(true);
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const filters = useSelector(selectFilters);
  const isLoading = useSelector(selectIsLoading);

  const isFilterOn = Boolean(
    filters.selectedMake ||
      filters.selectedPrice ||
      filters.minMileage ||
      filters.maxMileage
  );

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(fetchFirstPage());
      dispatch(fetchAllCars());
    }
  }, [dispatch, cars.length]);

  const handleLoadMore = async () => {
    const { payload } = await dispatch(fetchCars(page));

    setPage(page + 1);

    if (payload.length >= 12) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const filteredAdverts = useSelector(getFilterContacts);

  return (
    <>
      {isLoading && <LoaderSpiner />}
      {cars &&
        (filteredAdverts.length > 0 ? (
          <ul className={styles.advertsList}>
            {(isFilterOn ? filteredAdverts : cars).map(car => {
              return <CarItem car={car} key={car.id} />;
            })}
          </ul>
        ) : (
          <div className={styles.noMatching}>
            Sorry, no matching adverts found
          </div>
        ))}

      {isLoading ? (
        <LoaderSpiner />
      ) : (
        showButton &&
        !isFilterOn && (
          <button className={styles.btn} type="button" onClick={handleLoadMore}>
            Load more
          </button>
        )
      )}
    </>
  );
};

export default CarsCards;
