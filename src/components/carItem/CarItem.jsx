import React, { useEffect, useState } from 'react';
import styles from './CarItem.module.css';
import carPhoto from './../../imeges/2023-ferrari-roma.jpg';
import iconAddFavorites from './../../imeges/addHeart.svg';
import iconRemoveFavorites from './../../imeges/removeHeart.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorite } from 'redux/favorite/selectorsFavorite';
import {
  addToFavorites,
  removeFromFavorites,
} from 'redux/favorite/favoriteSlice';
import { fetchCarById } from 'redux/carsData/cardataThunk';
import Modal from 'components/modal/Modal';
import { selectIsLoading } from 'redux/carsData/selectorsCardsData';
import LoaderSpiner from 'components/loaderSpiner/LoaderSpiner';

const CarItem = ({ car }) => {
  const favorites = useSelector(selectFavorite);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [shownModal, setShownModal] = useState(false);

  useEffect(() => {
    if (shownModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [shownModal]);

  const toggleFavorite = car => {
    const isFavorite = favorites.some(favorite => favorite.id === car.id);

    if (isFavorite) {
      dispatch(removeFromFavorites(car));
    } else {
      dispatch(addToFavorites(car));
    }
  };

  const onModal = () => {
    setShownModal(!shownModal);
  };

  const handeleLearnMore = carId => {
    onModal();
    dispatch(fetchCarById(carId));
  };

  return (
    <>
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
      {isLoading ? (
        <LoaderSpiner />
      ) : (
        shownModal && <Modal onClose={onModal} shownModal={shownModal} />
      )}
    </>
  );
};

export default CarItem;
