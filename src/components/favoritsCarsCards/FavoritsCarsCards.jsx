import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFavorite } from 'redux/favorite/selectorsFavorite';
import styles from './FavoritsCarsCards.module.css';
import {
  addToFavorites,
  removeFromFavorites,
} from 'redux/favorite/favoriteSlice';
import iconAddFavorites from './../../imeges/addHeart.svg';
import iconRemoveFavorites from './../../imeges/removeHeart.svg';
import carPhotoFavorites from './../../imeges/2023ferrarisf90stradale.jpg';
import Modal from 'components/modal/Modal';
import { fetchCarById } from 'redux/carsData/cardataThunk';

const FavoritsCarsCards = () => {
  const favoritsCars = useSelector(selectFavorite);
  const dispatch = useDispatch();
  const [shownModal, setShownModal] = useState(false);
  console.log(favoritsCars);

  const onModal = () => {
    setShownModal(!shownModal);
  };

  const handeleLearnMore = carId => {
    dispatch(fetchCarById(carId));
    onModal();
  };

  useEffect(() => {
    if (shownModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [shownModal]);

  const toggleFavorite = car => {
    const isFavorite = favoritsCars.some(favorite => favorite.id === car.id);

    if (isFavorite) {
      dispatch(removeFromFavorites(car));
    } else {
      dispatch(addToFavorites(car));
    }
  };
  return (
    <>
      <div>
        <ul className={styles.advertsList}>
          {favoritsCars.map(car => {
            return (
              <li className={styles.cardLi} key={car.id}>
                <div className={styles.cardWrapper}>
                  <button
                    className={styles.btnAddFavorite}
                    onClick={() => toggleFavorite(car)}
                  >
                    {favoritsCars.some(favorite => favorite.id === car.id) ? (
                      <img src={iconAddFavorites} alt="icon add" />
                    ) : (
                      <img src={iconRemoveFavorites} alt="icon remove" />
                    )}
                  </button>
                  <img
                    className={styles.carImg}
                    src={car.img || carPhotoFavorites}
                    alt={car.model}
                    width={'460px'}
                    onError={e => {
                      e.target.src = carPhotoFavorites;
                    }}
                  />
                </div>
                <div className={styles.carTitle}>
                  <h2>
                    {car.make} <span>{car.model}</span>, {car.year}
                    {'      '}
                    {/* {car.rentalPrice} */}
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
                  {/* {car.accessories[1]}&ensp;|&ensp; */}
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
          {shownModal && <Modal onClose={onModal} shownModal={shownModal} />}
        </ul>
      </div>
    </>
  );
};

export default FavoritsCarsCards;
