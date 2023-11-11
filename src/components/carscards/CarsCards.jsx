import Modal from 'components/modal/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllCars,
  fetchCarById,
  fetchCars,
  fetchFirstPage,
} from 'redux/carsData/cardataThunk';
import styles from './CarsCards.module.css';
import { selectAllCars, selectCars } from 'redux/carsData/selectorsCardsData';
import {
  addToFavorites,
  removeFromFavorites,
} from 'redux/favorite/favoriteSlice';
import iconAddFavorites from './../../imeges/addHeart.svg';
import iconRemoveFavorites from './../../imeges/removeHeart.svg';
import carPhoto from './../../imeges/2023-ferrari-roma.jpg';
import { selectFavorite } from 'redux/favorite/selectorsFavorite';
import { selectFilters } from 'redux/filters/selectorsFilters';

const CarsCards = () => {
  const [page, setPage] = useState(2);
  const [shownModal, setShownModal] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const allCars = useSelector(selectAllCars);
  const filters = useSelector(selectFilters);
  console.log(filters);

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

    if (shownModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [dispatch, shownModal, cars.length]);

  const onModal = () => {
    setShownModal(!shownModal);
  };

  const handeleLearnMore = carId => {
    onModal();
    dispatch(fetchCarById(carId));
  };

  //   const handleLoadMore = () => {
  //     setPage(page + 1);
  //     dispatch(fetchCarsdata(page));
  //   };

  const handleLoadMore = async () => {
    const { payload } = await dispatch(fetchCars(page));
    console.log(payload);
    setPage(prevPage => prevPage + 1);
    if (payload.length >= 12) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const favorites = useSelector(selectFavorite);

  const toggleFavorite = car => {
    const isFavorite = favorites.some(favorite => favorite.id === car.id);

    if (isFavorite) {
      dispatch(removeFromFavorites(car));
    } else {
      dispatch(addToFavorites(car));
    }
  };

  const filteredAdverts = allCars.filter(adverts => {
    if (filters.selectedMake && adverts.make !== filters.selectedMake) {
      return false;
    }
    if (
      filters.selectedPrice &&
      parseInt(adverts.rentalPrice.slice(1), 10) > Number(filters.selectedPrice)
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
  return (
    <>
      <div>
        {cars &&
          (filteredAdverts.length > 0 ? (
            <ul className={styles.advertsList}>
              {(isFilterOn ? filteredAdverts : cars).map(car => {
                return (
                  <li className={styles.cardLi} key={car.id}>
                    <div className={styles.cardWrapper}>
                      <button
                        className={styles.btnAddFavorite}
                        onClick={() => toggleFavorite(car)}
                      >
                        {favorites.some(favorite => favorite.id === car.id) ? (
                          <img src={iconAddFavorites} alt="icon add" />
                        ) : (
                          <img src={iconRemoveFavorites} alt="icon remove" />
                        )}
                      </button>
                      <img
                        className={styles.carImg}
                        src={car.img || carPhoto}
                        alt={car.model}
                        width={'460px'}
                        onError={e => {
                          e.target.src = carPhoto;
                        }}
                      />
                    </div>
                    <div className={styles.carTitle}>
                      <h2>
                        {car.make} <span>{car.model}</span>, {car.year}
                        {'   '}
                      </h2>
                      <p>{car.rentalPrice}</p>
                    </div>

                    <div className={styles.carInfo}>
                      {car.address.split(',')[1]}&ensp;|&ensp;
                      {car.address.split(',')[2]}&ensp;|&ensp;
                      {car.rentalCompany}&ensp;|&ensp;
                      {car.type}&ensp;|&ensp;
                      {car.make}&ensp;|&ensp;
                      {car.mileage}&ensp;|&ensp;
                      {car.accessories[0]}&ensp;|&ensp;
                      {car.accessories[2]}&ensp;|&ensp;
                    </div>
                    <button
                      className={styles.btnLearnMore}
                      type="button"
                      onClick={() => handeleLearnMore(car.id)}
                    >
                      Learn more
                    </button>
                  </li>
                );
              })}
              {shownModal && (
                <Modal onClose={onModal} shownModal={shownModal} />
              )}
            </ul>
          ) : (
            <div className={styles.noMatching}>
              Sorry, no matching adverts found
            </div>
          ))}
      </div>
      {showButton && (
        <button className={styles.btn} type="button" onClick={handleLoadMore}>
          Load more
        </button>
      )}
    </>
  );
};

export default CarsCards;
